import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {ColorScheme} from '@constants';
import {HomeScreen, SearchScreen, UserScreen} from '@screens';
import {Image, TouchableOpacity, View} from 'react-native';
import HomeLineIcon from '@icons/home_3_line.svg';
import HomeFillIcon from '@icons/home_3_fill.svg';
import SearchLineIcon from '@icons/search_line.svg';
import SearchFillIcon from '@icons/search_fill.svg';
import UserLineIcon from '@icons/user_2_line.svg';
import UserFillIcon from '@icons/user_2_fill.svg';
import NotificationIcon from '@icons/notification_line.svg';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from "@react-navigation/stack";
import {AppStackParamList} from "@navigation";
import useUserProfileQuery from '../hooks/useUserProfileQuery';

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  const navigation = useNavigation<StackNavigationProp<AppStackParamList, 'BottomTabs'>>();
  const query = useUserProfileQuery();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: {
          elevation: 0
        },
        headerTitleStyle: {
          color: ColorScheme.textColor,
          fontWeight: 'bold',
          fontSize: 24
        },
        tabBarStyle: {
          backgroundColor: ColorScheme.primaryColor,
          elevation: 0,
          borderTopWidth: 0
        },
        tabBarActiveTintColor: ColorScheme.themeColor,
        tabBarInactiveTintColor: ColorScheme.textColor,
        tabBarLabelStyle: {marginBottom: 2}
      }}
    >
      <Tab.Screen
        options={{
          title: 'Trang chủ',
          headerRight: () => (
            <View style={{flexDirection: 'row', marginRight: 16}}>
              <TouchableOpacity
                activeOpacity={0.9}
                style={{padding: 0, marginRight: 8}}
                onPress={() => navigation.navigate('NotificationScreen')}
              >
                <View
                  style={{
                    height: 40,
                    width: 40,
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <NotificationIcon
                    height={28}
                    width={28}
                    fill={ColorScheme.textColor}
                  />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.9}
                style={{padding: 0}}
                onPress={() => navigation.navigate('BottomTabs', {screen: 'UserScreen'})}
              >
                <View
                  style={{
                    height: 40,
                    width: 40,
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <Image
                    source={
                      query.data ? query.data.user.avatar_url ? 
                        {uri: query?.data.user.avatar_url}
                        : require('../assets/default-avatar.png')
                        :
                        require('../assets/default-avatar.png')
                    }
                    style={{
                      height: 32,
                      width: 32,
                      borderRadius: 20
                    }}
                  />
                </View>
              </TouchableOpacity>
            </View>
          ),
          tabBarIcon: ({focused}) => {
            return (
              <>
                {focused ? (
                  <HomeFillIcon
                    height={24}
                    width={24}
                    fill={ColorScheme.themeColor}
                  />
                ) : (
                  <HomeLineIcon
                    height={24}
                    width={24}
                    fill={ColorScheme.textColor}
                  />
                )}
              </>
            );
          }
        }}
        name="HomeScreen"
        component={HomeScreen}
      />

      <Tab.Screen
        options={{
          title: 'Tìm kiếm',
          tabBarIcon: ({focused}) => {
            return (
              <>
                {focused ? (
                  <SearchFillIcon
                    height={24}
                    width={24}
                    fill={ColorScheme.themeColor}
                  />
                ) : (
                  <SearchLineIcon
                    height={24}
                    width={24}
                    fill={ColorScheme.textColor}
                  />
                )}
              </>
            );
          }
        }}
        name="SearchScreen"
        component={SearchScreen}
      />

      <Tab.Screen
        options={{
          title: 'Cá nhân',
          tabBarIcon: ({focused}) => {
            return (
              <>
                {focused ? (
                  <UserFillIcon
                    height={24}
                    width={24}
                    fill={ColorScheme.themeColor}
                  />
                ) : (
                  <UserLineIcon
                    height={24}
                    width={24}
                    fill={ColorScheme.textColor}
                  />
                )}
              </>
            );
          }
        }}
        name="UserScreen"
        component={UserScreen}
      />
    </Tab.Navigator>
  );
}
