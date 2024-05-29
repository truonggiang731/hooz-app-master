import {ColorScheme} from '@constants';
import {createStackNavigator} from '@react-navigation/stack';
import {ResetPasswordScreen, SendVerificationCodeScreen, SignInScreen, SignUpScreen} from '@screens';
import {TouchableOpacity, View} from 'react-native';
import {SessionStackParamList} from './Types';
import LeftIcon from '@icons/arrow_left_line.svg';

const Stack = createStackNavigator<SessionStackParamList>();

export default function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={({navigation}) => ({
        headerShown: false,
        headerTintColor: ColorScheme.textColor,
        headerTitleStyle: {color: ColorScheme.textColor},
        headerStyle: {
          backgroundColor: ColorScheme.primaryColor,
          elevation: 0,
          height: 56
        },
        headerLeft: () => {
          return (
            <TouchableOpacity
              activeOpacity={0.9}
              style={{padding: 0}}
              onPress={() => navigation.goBack(null)}
            >
              <View
                style={{
                  height: 40,
                  width: 44,
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <LeftIcon
                  height={28}
                  width={28}
                  fill={ColorScheme.themeColor}
                />
              </View>
            </TouchableOpacity>
          );
        }
      })}
    >
      <Stack.Screen name="SignInScreen" component={SignInScreen} />
      <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
      <Stack.Screen
        options={{headerShown: true, title: 'Lấy mã xác thực'}}
        name="SendVerificationCodeScreen"
        component={SendVerificationCodeScreen}
      />
      <Stack.Screen
        options={{headerShown: true, title: 'Đổi mật khẩu'}}
        name="ResetPasswordScreen"
        component={ResetPasswordScreen}
      />
    </Stack.Navigator>
  );
}
