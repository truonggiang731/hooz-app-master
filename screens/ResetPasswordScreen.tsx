import {View, StyleSheet, Alert} from "react-native";
import {ColorScheme, Dimensions} from "@constants";
import {Button, ITextInput} from "@components";
import {useState} from "react";
import {SessionService} from "@services";
import {isAxiosError} from "axios";
import {RouteProp, useRoute, useNavigation} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";
import {SessionStackParamList} from "@navigation";
import KeyIcon from '@icons/key_1_line.svg';

export default function ResetPasswordScreen() {
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  const navigation = useNavigation<StackNavigationProp<SessionStackParamList, 'ResetPasswordScreen'>>();
  const route = useRoute<RouteProp<SessionStackParamList, 'ResetPasswordScreen'>>();
  const {email, code} = route.params;

  const resetPassword = async () => {
    if (password !== passwordConfirmation) {
      Alert.alert('Lỗi', 'Mật khẩu nhập lại không khớp');
      return;
    }

    try {
      await SessionService.resetPassword(email, code, password)
      navigation.navigate('SignInScreen');
      Alert.alert('Thành công', 'Đổi mật khẩu thành công');
    } catch (error) {
      if (isAxiosError(error)) {
        Alert.alert('Lỗi', error.response?.data?.message || 'Đã có lỗi xảy ra, vui lòng kiểm tra lại kết nối');
      } else {
        Alert.alert('Lỗi', 'Đã có lỗi xảy ra, vui lòng kiểm tra lại kết nối');
      }
    }
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
            placeholder: 'Mật khẩu',
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
            placeholder: 'Mật khẩu nhập lại',
            secureTextEntry: true,
            value: passwordConfirmation,
            onChangeText: (text) => setPasswordConfirmation(text)
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
