import {FlatList, TouchableOpacity, View} from 'react-native';
import {ColorScheme} from '@constants';
import {NotificationService, Notification} from '@services';
import {Text, LoadingScreen, ErrorScreen} from '@components';
import Moment from 'moment';
import {useMemo} from 'react';
import {useInfiniteQuery} from '@tanstack/react-query';

export default function NotificationScreen() {
  const query = useInfiniteQuery({
    queryKey: ['notifications'],
    queryFn: ({ pageParam = 1 }) => NotificationService.getAllAsync({page: pageParam}),
    getNextPageParam: (lastPage) => {
      if (lastPage.paginate.page >= lastPage.paginate.total_pages) {
        return null;
      }

      return lastPage.paginate.page + 1;
    },
  });

  const notifications = useMemo(() => query.data?.pages.flatMap(page => page.notifications), [query.data])

  const fetchNextPage = () => {
    if (query.hasNextPage) {
      query.fetchNextPage();
    }
  }

  const renderNotificationItem = ({item}: {item: Notification}) => (
    <TouchableOpacity
      activeOpacity={0.9}
      style={{
        padding: 8,
        backgroundColor: ColorScheme.secondaryColor,
        borderRadius: 8,
        marginVertical: 4
      }}
    >
      <Text numberOfLines={1} style={{margin: 2, fontWeight: 'bold', fontSize: 16}}>{item.message.title}</Text>
      <Text style={{margin: 2}}>{item.message.body}</Text>
      <Text style={{margin: 2}}>{Moment(item.created_at).format('DD/MM/YY HH:mm:ss')}</Text>
    </TouchableOpacity>
  );

  if (query.isLoading) {
    return <LoadingScreen />
  }

  if (query.isLoading) {
    return <ErrorScreen />
  }

  if (notifications?.length == 0) {
    return(
      <View style={{flex: 1, backgroundColor: ColorScheme.primaryColor, alignItems: 'center', justifyContent: 'center'}}>
        <Text style={{color: ColorScheme.placeHolderColor}}>Không có nội dung</Text>
      </View>
    )
  }

  return (
    <FlatList<Notification>
      style={{flex: 1, backgroundColor: ColorScheme.primaryColor}}
      contentContainerStyle={{paddingHorizontal: 16, paddingVertical: 4}}
      data={notifications}
      renderItem={({item}) => renderNotificationItem({item})}
      keyExtractor={({id}) => id.toString()}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      onEndReached={fetchNextPage}
      onEndReachedThreshold={4}
    />
  )
}
