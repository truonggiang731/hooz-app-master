import {StyleSheet, Image, ScrollView} from 'react-native';
import {Dimensions, ColorScheme} from '@constants';
import {Button, Card, ErrorScreen, LoadingScreen, Text} from '@components';
import {SessionService, User, UserService} from '@services';
import {useCallback, useEffect, useState} from 'react';
import {TokensHelper} from '@helpers';
import {useAppSelector, useAppDispatch, useUserProfileQuery} from '@hooks';
import {setTokens} from '@redux/sessionSlide';
import {View} from 'react-native';
import {useNavigation} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";
import {AppStackParamList} from "@navigation";
import {RefreshControl} from 'react-native';
import Moment from 'moment';
import * as ImagePicker from 'expo-image-picker';

import UserIcon from '@icons/user_2_line.svg';
import KeyIcon from '@icons/key_1_line.svg';
import HeartIcon from '@icons/heart_line.svg';
import VipIcon from '@icons/VIP_4_line.svg';
import SendIcon from '@icons/send_plane_line.svg';
import InfoIcon from '@icons/information_line.svg';
import NotificationIcon from '@icons/notification_line.svg';
import HistoryIcon from '@icons/history_line.svg';
import DocumentIcon from '@icons/document_line.svg';
import SettingIcon from '@icons/settings_2_line.svg';
import {TouchableOpacity} from 'react-native';
import {useMutation, useQueryClient} from '@tanstack/react-query';

export default function UserScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const [user, setUser] = useState<User>();
  const [signingOut, setSigningOut] = useState(false);

  const navigation = useNavigation<StackNavigationProp<AppStackParamList, 'BottomTabs'>>();

  const dispatch = useAppDispatch();
  const {tokens} = useAppSelector(state => state.session);

  const queryClient = useQueryClient();
  const query = useUserProfileQuery();

  useEffect(() => {
    if (query.data)
      setUser(query.data.user);
  }, [query.data]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    query.refetch().then(() => {
      setRefreshing(false);
    })
  }, []);

  const updateAvatar = useMutation(
    (avatar: string) => UserService.updateAvatar(avatar),
    { onSettled: () => {query.refetch()} }
  )

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      updateAvatar.mutate(result.assets[0].uri);
    }
  };

  useEffect(() => {
    const willFocusSubscription = navigation.addListener('focus', () => {
      query.refetch();
    });

    return willFocusSubscription;
  }, [navigation]);

  const signOut = async () => {
    setSigningOut(true);

    try {
      await SessionService.signOutAsync(tokens!);
    } catch (error) {
    } finally {
    }

    queryClient.clear();

    await TokensHelper.eraseTokensAsync();
    dispatch(setTokens(null));

    setSigningOut(false);
  };

  if (query.isLoading || signingOut) {
    return <LoadingScreen />
  }

  if (query.isError) {
    return <ErrorScreen />
  }

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={[ColorScheme.themeColor]}
          progressBackgroundColor={ColorScheme.secondaryColor}
        />
      }
    >
      <Card style={styles.session}>
        <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: Dimensions.borderRadius * 2}}>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={pickImage}
          >
            <Image
              style={{width: 60, height: 60, borderRadius: 30}}
              source={
                query.data.user.avatar_url ?
                  {uri: query.data.user.avatar_url}
                  :
                  require('../assets/default-avatar.png')
              }
            />
          </TouchableOpacity>
          <Text numberOfLines={1} style={[styles.title, {flex: 1, marginLeft: Dimensions.margin * 2}]}>
            {user?.firstname === '' || user?.lastname === '' ? user?.email : `${user?.lastname} ${user?.firstname}`}
          </Text>
        </View>
        <Button type={'primary'} onPress={signOut} title={'Đăng xuất'} />
      </Card>

      <View style={styles.session}>
        <Text style={styles.sessionTitle}>Tài khoản</Text>
        <Button
          showMoreIcon
          style={styles.sessionButton}
          type={'secondary'}
          onPress={() => navigation.navigate('ChangeInfoScreen')}
          title={'Chỉnh sửa thông tin cá nhân'}
          titleStyle={{fontWeight: 'bold'}}
          icon={<UserIcon height={Dimensions.iconSize} width={Dimensions.iconSize} fill={ColorScheme.themeColor} />}
        />
        <Button
          showMoreIcon
          style={styles.sessionButton}
          type={'secondary'}
          onPress={() => navigation.navigate('ChangePasswordScreen')}
          title={'Đổi mật khẩu'}
          titleStyle={{fontWeight: 'bold'}}
          icon={<KeyIcon height={Dimensions.iconSize} width={Dimensions.iconSize} fill={ColorScheme.themeColor} />}
        />
        <Button
          showMoreIcon
          style={styles.sessionButton}
          type={'secondary'}
          onPress={() => navigation.navigate('FavoritedBooksScreen')}
          title={'Sách yêu thích'}
          titleStyle={{fontWeight: 'bold'}}
          icon={<HeartIcon height={Dimensions.iconSize} width={Dimensions.iconSize} fill={ColorScheme.themeColor} />}
        />

        <Button
          showMoreIcon
          type={'secondary'}
          onPress={() => navigation.navigate('NotificationScreen')}
          title={'Thông báo'}
          titleStyle={{fontWeight: 'bold'}}
          icon={<NotificationIcon height={Dimensions.iconSize} width={Dimensions.iconSize} fill={ColorScheme.themeColor} />}
        />
      </View>

      <View style={styles.session}>
        <Text style={styles.sessionTitle}>Gói</Text>
        {user?.current_plan ? 
          <Card style={styles.sessionButton}>
            <Text style={{marginBottom: 8, fontWeight: 'bold'}}>Gói hiện tại</Text>
            <Text style={{marginBottom: 4}}>Ngày đăng ký: {Moment(user?.current_plan.effective_date).format('DD/MM/YYYY HH:mm:ss')}</Text>
            <Text>Ngày hết hạn: {Moment(user?.current_plan.expiry_date).format('DD/MM/YYYY HH:mm:ss')}</Text>
          </Card>
          :
          <Button
            showMoreIcon
            style={styles.sessionButton}
            type={'secondary'}
            onPress={() => navigation.navigate('PlansScreen')}
            title={'Đăng ký gói ngay'}
            titleStyle={{fontWeight: 'bold'}}
            icon={<VipIcon height={Dimensions.iconSize} width={Dimensions.iconSize} fill={ColorScheme.themeColor} />}
          />
        }
        <Button
          showMoreIcon
          type={'secondary'}
          onPress={() => navigation.navigate('PurchaseHistoryScreen')}
          title={'Lịch sử đăng ký'}
          titleStyle={{fontWeight: 'bold'}}
          icon={<HistoryIcon height={Dimensions.iconSize} width={Dimensions.iconSize} fill={ColorScheme.themeColor} />}
        />
      </View>

      <View style={styles.session}>
        <Text style={styles.sessionTitle}>Hệ thống</Text>
        <Button
          showMoreIcon
          style={styles.sessionButton}
          type={'secondary'}
          onPress={() => navigation.navigate('ReadingOptionScreen')}
          title={'Cài đặt đọc sách'}
          titleStyle={{fontWeight: 'bold'}}
          icon={<SettingIcon height={Dimensions.iconSize} width={Dimensions.iconSize} fill={ColorScheme.themeColor} />}
        />
        <Button
          showMoreIcon
          style={styles.sessionButton}
          type={'secondary'}
          onPress={() => navigation.navigate('FeedbackScreen')}
          title={'Góp ý'}
          titleStyle={{fontWeight: 'bold'}}
          icon={<SendIcon height={Dimensions.iconSize} width={Dimensions.iconSize} fill={ColorScheme.themeColor} />}
        />
        <Button
          showMoreIcon
          style={styles.sessionButton}
          type={'secondary'}
          onPress={() => navigation.navigate('PolicyAndTermScreen')}
          title={'Điều khoản chính sách'}
          titleStyle={{fontWeight: 'bold'}}
          icon={<DocumentIcon height={Dimensions.iconSize} width={Dimensions.iconSize} fill={ColorScheme.themeColor} />}
        />
        <Button
          showMoreIcon
          type={'secondary'}
          onPress={() => navigation.navigate('IntroductionScreen')}
          title={'Giới thiệu'}
          titleStyle={{fontWeight: 'bold'}}
          icon={<InfoIcon height={Dimensions.iconSize} width={Dimensions.iconSize} fill={ColorScheme.themeColor} />}
        />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ColorScheme.primaryColor,
    paddingHorizontal: Dimensions.padding * 2,
    paddingBottom: Dimensions.padding * 2
  },
  session: {
    marginBottom: Dimensions.margin * 2
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  sessionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: Dimensions.margin
  },
  sessionButton: {
    marginBottom: Dimensions.margin
  }
});
