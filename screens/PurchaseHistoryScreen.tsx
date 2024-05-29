import {FlatList, TouchableOpacity, View} from 'react-native'
import {PlanService, Purchase} from '@services';
import {Text, LoadingScreen, ErrorScreen} from '@components';
import Moment from 'moment';
import {useMemo} from 'react';
import {useInfiniteQuery} from '@tanstack/react-query';
import ColorScheme from '../constants/ColorScheme';

export default function PurchaseHistoryScreen() {
  const query = useInfiniteQuery({
    queryKey: ['purchases'],
    queryFn: ({ pageParam = 1 }) => PlanService.getAllPurchasesAsync({page: pageParam}),
    getNextPageParam: (lastPage) => {
      if (lastPage.paginate.page >= lastPage.paginate.total_pages) {
        return null;
      }

      return lastPage.paginate.page + 1;
    },
  });

  const purchases = useMemo(() => query.data?.pages.flatMap(page => page.purchases), [query.data])

  const fetchNextPage = () => {
    if (query.hasNextPage) {
      query.fetchNextPage();
    }
  }

  const renderNotificationItem = ({item}: {item: Purchase}) => (
    <TouchableOpacity
      activeOpacity={0.9}
      style={{
        padding: 8,
        backgroundColor: ColorScheme.secondaryColor,
        borderRadius: 8,
        marginVertical: 4
      }}
    >
      <Text numberOfLines={1} style={{margin: 2, fontWeight: 'bold', fontSize: 16}}>{item.plan.name}</Text>
      <Text numberOfLines={1} style={{margin: 2}}>
        <Text numberOfLines={1} style={{fontWeight: 'bold'}}>{'Ngày có hiệu lực: '}</Text>
        {Moment(item.effective_date).format('DD/MM/YY HH:mm:ss')}
      </Text>
      <Text numberOfLines={1} style={{margin: 2}}>
        <Text numberOfLines={1} style={{fontWeight: 'bold'}}>{'Ngày có hết hạn: '}</Text>
        {Moment(item.expiry_date).format('DD/MM/YY HH:mm:ss')}
      </Text>
      <Text numberOfLines={1} style={{margin: 2}}>
        <Text numberOfLines={1} style={{fontWeight: 'bold'}}>{'Tổng tiền: '}</Text>
        {item.price.toString() + 'đ'}
      </Text>
      <Text numberOfLines={1} style={{margin: 2}}>
        <Text numberOfLines={1} style={{fontWeight: 'bold'}}>{'Phương thức thanh toán: '}</Text>
        {item.payment_method == 'card' ? 'Thẻ Master/Visa' : 'Không rõ'}
      </Text>
    </TouchableOpacity>
  );

  if (query.isLoading) {
    return <LoadingScreen />
  }

  if (query.isLoading) {
    return <ErrorScreen />
  }

  if (purchases?.length == 0) {
    return(
      <View style={{flex: 1, backgroundColor: ColorScheme.primaryColor, alignItems: 'center', justifyContent: 'center'}}>
        <Text style={{color: ColorScheme.placeHolderColor}}>Không có nội dung</Text>
      </View>
    )
  }

  return (
    <FlatList<Purchase>
      style={{flex: 1, backgroundColor: ColorScheme.primaryColor}}
      contentContainerStyle={{paddingHorizontal: 8, paddingVertical: 4}}
      data={purchases}
      renderItem={({item}) => renderNotificationItem({item})}
      keyExtractor={({id}) => id.toString()}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      onEndReached={fetchNextPage}
      onEndReachedThreshold={4}
    />
  )
}
