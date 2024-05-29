import {View, StyleSheet, Alert} from "react-native";
import {ColorScheme, Dimensions} from "@constants";
import {Button, ITextInput, DTextInput} from "@components";
import {useState} from "react";
import MailIcon from '@icons/mail_line.svg';
import ClassifyIcon from '@icons/classify_line.svg';
import {SessionService} from "@services";
import {isAxiosError} from "axios";
import {useNavigation} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";
import {SessionStackParamList} from "../navigation/Types";

export default function SendVerificationCodeScreen() {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');

  const navigation = useNavigation<StackNavigationProp<SessionStackParamList, 'SendVerificationCodeScreen'>>();

  const sendverificationcode = async () => {
    try {
      await SessionService.sendVerificationCode(email);
      Alert.alert('Thành công', 'Mã xác thực đã được gửi đến email của bạn');
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
        <DTextInput
          style={styles.part}
          textInput={{
            placeholder: 'Email',
            value: email,
            onChangeText: (text) => setEmail(text)
          }}
          leftArea={<MailIcon height={20} width={20} fill={ColorScheme.themeColor} />}
          leftAreaStyle={{width: Dimensions.height}}
          rightArea={
            <Button
              title={'Gửi mã'}
              type={'transparent'}
              titleStyle={{color: ColorScheme.themeColor}}
              onPress={sendverificationcode}
            />
          }
        />
        <ITextInput
          style={styles.part}
          icon={
            <ClassifyIcon height={20} width={20} fill={ColorScheme.themeColor} />
          }
          textInput={{
            placeholder: 'Mã xác thực',
            value: code,
            onChangeText: (text) => setCode(text)
          }}
        />
      </View>
      <Button
        title={'Tiếp tục'}
        type={'primary'}
        onPress={() => navigation.navigate('ResetPasswordScreen', {email, code})}
      />
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
