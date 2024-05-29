import {FlatList, RefreshControl, View, StyleSheet} from "react-native"
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {ColorScheme, Dimensions} from '@constants';
import {AppStackParamList} from "../navigation/Types";
import {useInfiniteQuery} from "@tanstack/react-query";
import {BookService} from "@services";
import {useCallback, useEffect, useMemo, useState} from "react";
import BookItem from "../components/BookItem";
import LoadingScreen from "../components/LoadingScreen";
import ErrorScreen from "../components/ErrorScreen";
import Text from "../components/Text";

export default function FavoritedBooksScreen() {
  const [refreshing, setRefreshing] = useState(false);

  const navigation = useNavigation<StackNavigationProp<AppStackParamList, 'BooksScreen'>>();

  const query = useInfiniteQuery({
    queryKey: ['books', 'favorited'],
    queryFn: ({ pageParam = 1 }) => BookService.getFavoritedAsync({page: pageParam}),
    getNextPageParam: (lastPage) => {
      if (lastPage.paginate.page >= lastPage.paginate.total_pages) {
        return null;
      }

      return lastPage.paginate.page + 1;
    },
  });

  const fetchNextPage = () => {
    if (query.hasNextPage) {
      query.fetchNextPage();
    }
  }

  useEffect(() => {
    const willFocusSubscription = navigation.addListener('focus', () => {
      query.refetch();
    });

    return willFocusSubscription;
  }, [navigation]);

  const books = useMemo(() => query.data?.pages.flatMap(page => page.books), [query.data])

  const renderCategoriesItem = ({item}: {item: any}) => {
    return (
      <BookItem
        data={item}
        style={{marginVertical: 4}}
        onPress={() => navigation.navigate('BookScreen', {title: item.name, book_id: item.id})}
      />
    );
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    query.refetch().then(() => {
      setRefreshing(false);
    })
  }, []);

  if (query.isLoading) {
    return <LoadingScreen />
  }

  if (query.isError) {
    return (
      <ErrorScreen onPress={() => query.refetch()} />
    )
  }

  if (books?.length == 0) {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: ColorScheme.primaryColor}}>
        <Text style={{color: ColorScheme.placeHolderColor}}>Không có nội dung</Text>
      </View>
    )
  }

  return (
    <FlatList
      style={styles.container}
      data={books}
      renderItem={renderCategoriesItem}
      numColumns={1}
      contentContainerStyle={{paddingHorizontal: Dimensions.padding * 2, paddingBottom: Dimensions.padding * 2 - 4}}
      initialNumToRender={20}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      onEndReached={fetchNextPage}
      onEndReachedThreshold={4}
      keyExtractor={item => item.id.toString()}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={[ColorScheme.themeColor]}
          progressBackgroundColor={ColorScheme.secondaryColor}
        />
      }
    />
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ColorScheme.primaryColor
  }
});
