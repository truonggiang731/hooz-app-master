import {View, StyleSheet, Alert} from 'react-native';
import {ColorScheme, Dimensions} from '@constants';
import {Button, ITextInput, LoadingScreen, Text} from '@components';
import {useState} from 'react';
import {SessionService, SignInParams} from '@services';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {SessionStackParamList} from '@navigation';
import {useAppDispatch} from '@hooks';
import {NotifyHelper, TokensHelper} from '@helpers';
import {setTokens} from '@redux/sessionSlide';
import MailIcon from '@icons/mail_line.svg';
import KeyIcon from '@icons/key_1_line.svg';
import {isAxiosError} from 'axios';

export default function SignUpScreen() {
  const [params, setParams] = useState<SignInParams>({email: '', password: ''});
  const [signingUp, setSigningUp] = useState(false);

  const dispatch = useAppDispatch();
  const navigation = useNavigation<StackNavigationProp<SessionStackParamList, 'SignUpScreen'>>();

  const signUp = async () => {
    setSigningUp(true);

    try {
      const _tokens = await SessionService.signUpAsync(params, await NotifyHelper.getExpoPushTokenAsync());

      await TokensHelper.setTokensAsync(_tokens);

      dispatch(setTokens(_tokens));
    } catch (error) {
      if (isAxiosError(error)) {
        if (error.response) {
          Alert.alert('Lỗi', error.response.data.message);
        } else {
          Alert.alert('Lỗi', 'Vui lòng kiểm tra lại kết nối mạng');
        }
      } else {
        Alert.alert('Lỗi', 'Vui lòng kiểm tra lại kết nối mạng');
      }
    }

    setSigningUp(false);
  };

  if (signingUp) {
    return <LoadingScreen />
  }

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.logo}>HOOZ</Text>
        <ITextInput
          style={styles.part}
          icon={
            <MailIcon height={20} width={20} fill={ColorScheme.themeColor} />
          }
          textInput={{
            placeholder: 'Email',
            value: params.email,
            onChangeText: (text) => setParams({...params, email: text})
          }}
        />
        <ITextInput
          style={styles.part}
          icon={
            <KeyIcon height={20} width={20} fill={ColorScheme.themeColor} />
          }
          textInput={{
            placeholder: 'Mật khẩu',
            secureTextEntry: true,
            value: params.password,
            onChangeText: (text) => setParams({...params, password: text})
          }}
        />
        <Button
          style={styles.part}
          title="Đăng ký"
          type="primary"
          onPress={signUp}
        />
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <Text style={styles.part}>
            Bạn đã có tài khoản? <Text style={styles.link} onPress={() => navigation.navigate('SignInScreen')}>đăng nhập ngay</Text>
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ColorScheme.primaryColor,
    padding: Dimensions.padding * 2,
    justifyContent: 'center'
  },
  logo: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: Dimensions.fontSize * 6,
    color: ColorScheme.themeColor,
    marginBottom: Dimensions.margin * 6
  },
  part: {
    marginVertical: Dimensions.margin
  },
  link: {
    color: ColorScheme.themeColor,
    fontWeight: 'bold'
  }
});
