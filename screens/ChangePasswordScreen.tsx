import {View, StyleSheet, Alert} from "react-native";
import {ColorScheme, Dimensions} from "@constants";
import {Button, ITextInput, LoadingScreen} from "@components";
import {useState} from "react";
import {UserService} from "@services";
import {isAxiosError} from "axios";
import {useNavigation} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";
import {AppStackParamList} from "@navigation";
import KeyIcon from '@icons/key_1_line.svg';

export default function ChangePasswordScreen() {
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordConfirmation, setNewPasswordConfirmation] = useState('');

  const [isloading, setIsLoading] = useState(false);

  const navigation = useNavigation<StackNavigationProp<AppStackParamList, 'ChangePasswordScreen'>>();

  const resetPassword = async () => {
    if (newPassword !== newPasswordConfirmation) {
      Alert.alert('Lỗi', 'Mật khẩu nhập lại không khớp');
      return;
    }

    setIsLoading(true);

    try {
      await UserService.updateAccount({ password, new_password: newPassword });
      navigation.goBack();
      Alert.alert('Thành công', 'Đổi mật khẩu thành công');
    } catch (error) {
      if (isAxiosError(error)) {
        Alert.alert('Lỗi', error.response?.data?.message || 'Đã có lỗi xảy ra, vui lòng kiểm tra lại kết nối');
      } else {
        Alert.alert('Lỗi', 'Đã có lỗi xảy ra, vui lòng kiểm tra lại kết nối');
      }
    }
    
    setIsLoading(false);
  }

  if (isloading) {
    return <LoadingScreen />
  }

  return (
    <View style={styles.container}>
      <View style={{flex: 1}}>
        <ITextInput
          style={styles.part}
          icon={
            <KeyIcon height={20} width={20} fill={ColorScheme.themeColor} />
          }
          textInput={{
            placeholder: 'Mật khẩu hiện tại',
            secureTextEntry: true,
            value: password,
            onChangeText: (text) => setPassword(text)
          }}
        />
        <ITextInput
          style={styles.part}
          icon={
            <KeyIcon height={20} width={20} fill={ColorScheme.themeColor} />
          }
          textInput={{
            placeholder: 'Mật khẩu mới',
            secureTextEntry: true,
            value: newPassword,
            onChangeText: (text) => setNewPassword(text)
          }}
        />
        <ITextInput
          style={styles.part}
          icon={
            <KeyIcon height={20} width={20} fill={ColorScheme.themeColor} />
          }
          textInput={{
            placeholder: 'Mật khẩu mới nhập lại',
            secureTextEntry: true,
            value: newPasswordConfirmation,
            onChangeText: (text) => setNewPasswordConfirmation(text)
          }}
        />
      </View>
      <Button title={'Xác nhận'} type={'primary'} onPress={resetPassword} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ColorScheme.primaryColor,
    padding: Dimensions.padding * 2
  },
  part: {
    marginVertical: Dimensions.margin
  },
});
