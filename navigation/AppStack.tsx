import {createStackNavigator} from '@react-navigation/stack';
import {TouchableOpacity, View} from 'react-native';
import {AppStackParamList} from './Types';
import {ColorScheme} from '@constants';
import {BooksScreen, BookScreen, ChangePasswordScreen, ChangeInfoScreen, FavoritedBooksScreen, PlansScreen, CardPaymentScreen, NotificationScreen, PurchaseHistoryScreen, FeedbackScreen, PolicyAndTermScreen} from '@screens';
import BottomTabs from './BottomTabs';
import LeftIcon from '@icons/arrow_left_line.svg';
import SettingIcon from '@icons/settings_2_line.svg';
import ReadingScreen from '../screens/ReadingScreen';
import SearchingScreen from '../screens/SearchingScreen';
import ReadingOptionScreen from '../screens/ReadingOptionScreen';

const Stack = createStackNavigator<AppStackParamList>();

export default function AppStack() {
  return (
    <Stack.Navigator
      screenOptions={({navigation}) => ({
        headerTintColor: ColorScheme.themeColor,
        headerTitleStyle: {color: ColorScheme.textColor, fontSize: 22, fontWeight: 'bold'},
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
                  width: 60,
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <LeftIcon
                  height={28}
                  width={28}
                  fill={ColorScheme.textColor}
                />
              </View>
            </TouchableOpacity>
          );
        }
      })}
    >
      <Stack.Screen
        options={{headerShown: false}}
        name="BottomTabs"
        component={BottomTabs}
      />
      <Stack.Screen
        name="BooksScreen"
        component={BooksScreen}
        options={({route}) => ({ title: route.params.title || 'Các sách'})}
      />
      <Stack.Screen
        name="BookScreen"
        component={BookScreen}
        options={({route}) => ({
          title: route.params.title || 'Sách'
        })}
      />
      <Stack.Screen
        name="ReadingOptionScreen"
        component={ReadingOptionScreen}
        options={{
          title: 'Cài đặt đọc sách'
        }}
      />
      <Stack.Screen
        name="ReadingScreen"
        component={ReadingScreen}
        options={({route, navigation}) => ({
          title: route.params.title || 'Đọc sách',
          headerRight: () => (
            <TouchableOpacity
              activeOpacity={0.9}
              style={{padding: 0}}
              onPress={() => navigation.navigate('ReadingOptionScreen')}
            >
              <View
                style={{
                  height: 40,
                  width: 40,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <SettingIcon
                  height={28}
                  width={28}
                  fill={ColorScheme.textColor}
                />
              </View>
            </TouchableOpacity>
          )
        })}
      />
      <Stack.Screen
        name="SearchingScreen"
        component={SearchingScreen}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="ChangePasswordScreen"
        component={ChangePasswordScreen}
        options={{
          title: 'Đổi mật khẩu'
        }}
      />
      <Stack.Screen
        name="ChangeInfoScreen"
        component={ChangeInfoScreen}
        options={{
          title: 'Thay đổi thông tin'
        }}
      />
      <Stack.Screen
        name="FavoritedBooksScreen"
        component={FavoritedBooksScreen}
        options={{
          title: 'Sách yêu thích'
        }}
      />
      <Stack.Screen
        name="PlansScreen"
        component={PlansScreen}
        options={{
          title: 'Đăng ký gói'
        }}
      />
      <Stack.Screen
        name="CardPaymentScreen"
        component={CardPaymentScreen}
        options={{
          title: 'Thanh toán'
        }}
      />
      <Stack.Screen
        name="NotificationScreen"
        component={NotificationScreen}
        options={{
          title: 'Thông báo'
        }}
      />
      <Stack.Screen
        name="PurchaseHistoryScreen"
        component={PurchaseHistoryScreen}
        options={{
          title: 'Lịch sử đăng ký gói'
        }}
      />
      <Stack.Screen
        name="FeedbackScreen"
        component={FeedbackScreen}
        options={{
          title: 'Góp ý'
        }}
      />
      <Stack.Screen
        name="PolicyAndTermScreen"
        component={PolicyAndTermScreen}
        options={{
          title: 'Điều khoản và chính sách'
        }}
      />
      <Stack.Screen
        name="IntroductionScreen"
        component={PolicyAndTermScreen}
        options={{
          title: 'Giới thiệu'
        }}
      />
    </Stack.Navigator>
  );
}
