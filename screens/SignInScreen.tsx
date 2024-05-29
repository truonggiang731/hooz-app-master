import {View, StyleSheet, Alert} from 'react-native';
import {ColorScheme, Dimensions} from '@constants';
import {Button, ITextInput, LoadingScreen, Text} from '@components';
import {useState} from 'react';
import {SessionService, SignInParams} from '@services';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {SessionStackParamList} from '@navigation';
import MailIcon from '@icons/mail_line.svg';
import KeyIcon from '@icons/key_1_line.svg';
import {NotifyHelper, TokensHelper} from '@helpers';
import {useAppDispatch} from '@hooks';
import {setTokens} from '@redux/sessionSlide';
import {isAxiosError} from 'axios';

export default function SignInScreen() {
  const [params, setParams] = useState<SignInParams>({email: '', password: ''});
  const [signingIn, setSigningIn] = useState(false);

  const dispatch = useAppDispatch();
  const navigation = useNavigation<StackNavigationProp<SessionStackParamList, 'SignInScreen'>>();

  const signIn = async () => {
    setSigningIn(true);

    try {
      const _tokens = await SessionService.signInAsync(params, await NotifyHelper.getExpoPushTokenAsync());

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

    setSigningIn(false);
  };

  if (signingIn) {
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
        <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
          <Text style={[styles.part, styles.link]} onPress={() => navigation.navigate('SendVerificationCodeScreen')}>Quên mật khẩu?</Text>
        </View>
        <Button
          style={styles.part}
          title="Đăng nhập"
          type="primary"
          onPress={signIn}
        />
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <Text style={styles.part}>
            Bạn chưa có tài khoản? <Text style={styles.link} onPress={() => navigation.navigate('SignUpScreen')}>đăng ký ngay</Text>
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
