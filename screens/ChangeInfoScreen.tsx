import {StyleSheet, View, ScrollView, Alert} from 'react-native';
import {useEffect, useState} from 'react';
import {Button, LoadingScreen, ErrorScreen, TextInput} from '@components';
import {UserService} from '@services';
import {useNavigation} from '@react-navigation/native';
import {useMutation} from '@tanstack/react-query';
import {ColorScheme} from '@constants';
import {useUserProfileQuery} from '@hooks';
import DatePicker from 'react-native-date-picker';
import Moment from 'moment';
import {isAxiosError} from 'axios';

export default function ChangeInfoScreen() {
  const [userInfo, setUserInfo] = useState<{firstname: string, lastname: string, birthday: Date}>({firstname: '', lastname: '', birthday: new Date()});
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigation = useNavigation();
  const query = useUserProfileQuery();

  const changeInfo = async () => {
    setIsLoading(true);

    try {
      await UserService.updateInfo(userInfo);
      navigation.goBack();
      Alert.alert('Thành công', 'Cập nhật thông tin thành công');
    } catch (error) {
      if (isAxiosError(error)) {
        Alert.alert('Lỗi', error.response?.data?.message || 'Đã có lỗi xảy ra, vui lòng kiểm tra lại kết nối');
      } else {
        Alert.alert('Lỗi', 'Đã có lỗi xảy ra, vui lòng kiểm tra lại kết nối');
      }
    }
    
    setIsLoading(false);
  }

  useEffect(() => {
    setUserInfo(query.data.user);
  }, []);

  if (query.isLoading || isLoading) {
    return <LoadingScreen />
  }

  if (query.isError) {
    return <ErrorScreen />
  }

  return (
    <View style={styles.container}>
      <ScrollView
        style={{flex: 1}}
        contentContainerStyle={{paddingVertical: 4, paddingHorizontal: 8}}
      >
        <View style={{flexDirection: 'row', marginVertical: 4}}>
          <TextInput
            style={{flex: 1, marginRight: 4}}
            keyboardType='numbers-and-punctuation'
            placeholder={'Họ'}
            onChangeText={value => setUserInfo({...userInfo, lastname: value})}
            value={userInfo.lastname}
          />
          <TextInput
            style={{flex: 1, marginLeft: 4}}
            keyboardType='numbers-and-punctuation'
            placeholder={'Tên'}
            onChangeText={value => setUserInfo({...userInfo, firstname: value})}
            value={userInfo.firstname}
          />
        </View>
        <Button
          type='secondary'
          style={{flex: 1, marginVertical: 4, justifyContent: 'flex-start'}}
          title={'Sinh nhật: ' + Moment(userInfo.birthday).format('DD/MM/yyyy') }
          onPress={() => setIsDatePickerOpen(true)}
        />
        <DatePicker
          modal={true}
          theme={'dark'}
          style={{backgroundColor: ColorScheme.primaryColor}}
          textColor={ColorScheme.textColor}
          cancelText={'Hủy'}
          confirmText={'Xác nhận'}
          title={'Chọn ngày sinh'}
          mode={'date'}
          locale={'vi_VN'}
          open={isDatePickerOpen}
          date={new Date(userInfo.birthday)}
          onConfirm={(date) => {
            setIsDatePickerOpen(false);
            setUserInfo({...userInfo, birthday: date});
          }}
          onCancel={() => {
            setIsDatePickerOpen(false);
          }}
        />
      </ScrollView>
      <Button
        type='primary'
        style={{margin: 8}}
        title={'Cập nhật'}
        titleStyle={{fontWeight: 'bold'}}
        onPress={changeInfo}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ColorScheme.primaryColor
  }
})
