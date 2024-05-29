import {View, StyleSheet, ScrollView} from 'react-native';
import {ColorScheme, Dimensions} from '@constants';
import {BookItem, Button, Card, ErrorScreen, LoadingScreen, Text} from '@components';
import {useQuery} from '@tanstack/react-query';
import {BookService, Book} from '@services';
import {useEffect, useState} from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import {AppStackParamList} from '@navigation';
import {useNavigation} from '@react-navigation/native';

export default function HomeScreen() {
  const [newestBooks, setNewestBooks] = useState<Book[]>([]);
  const [freeBooks, setFreeBooks] = useState<Book[]>([]);
  const [mostViewedBooks, setMostViewedBooks] = useState<Book[]>([]);
  const [mostFavoriteBooks, setMostFavoriteBooks] = useState<Book[]>([]);
  const [readingBooks, setReadingBooks] = useState<Book[]>([]);

  const navigation = useNavigation<StackNavigationProp<AppStackParamList, 'BooksScreen'>>();

  const newestBooksQuery = useQuery({
    queryKey: ['books', 'newest'],
    queryFn: () => BookService.getAllAsync({per_page: 4, sort_by: 'created_at-desc'}),
    onSuccess: (data) => {
      setNewestBooks(data.books);
    }
  });

  const freeBooksQuery = useQuery({
    queryKey: ['books', 'free'],
    queryFn: () => BookService.getAllAsync({per_page: 4, free: true}),
    onSuccess: (data) => {
      setFreeBooks(data.books);
    }
  });

  const mostViewedBooksQuery = useQuery({
    queryKey: ['books', 'most_viewed'],
    queryFn: () => BookService.getAllAsync({per_page: 4, sort_by: 'views-desc'}),
    onSuccess: (data) => {
      setMostViewedBooks(data.books);
    }
  });

  const mostFavoriteBooksQuery = useQuery({
    queryKey: ['books', 'most_viewed'],
    queryFn: () => BookService.getAllAsync({per_page: 4, sort_by: 'favorites-desc'}),
    onSuccess: (data) => {
      setMostFavoriteBooks(data.books);
    }
  });

  const readingBooksQuery = useQuery({
    queryKey: ['books', 'reading'],
    queryFn: () => BookService.getReadAsync({per_page: 2}),
    onSuccess: (data) => {
      setReadingBooks(data.books);
    }
  });

  useEffect(() => {
    const willFocusSubscription = navigation.addListener('focus', () => {
      readingBooksQuery.refetch();
    });

    return willFocusSubscription;
  }, [navigation]);

  if (newestBooksQuery.isLoading || freeBooksQuery.isLoading || mostViewedBooksQuery.isLoading || mostFavoriteBooksQuery.isLoading || readingBooksQuery.isLoading) {
    return <LoadingScreen />
  }

  if (newestBooksQuery.isError || freeBooksQuery.isError || mostViewedBooksQuery.isError || mostFavoriteBooksQuery.isError || readingBooksQuery.isError) {
    return <ErrorScreen />
  }

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      style={styles.container}
    >
      {readingBooks.length > 0 &&
      <Card style={styles.session}>
        <Text>Sách đang đọc</Text>
        <Text style={styles.sessionTitle}>Dành 15 phút mỗi ngày để đọc sách</Text>
        <View>
          {readingBooks.map((book) => (
            <BookItem
              key={book.id.toString()}
              data={book}
              style={{marginVertical: 4, padding: 0}}
              onPress={() => navigation.navigate('BookScreen', {title: book.name, book_id: book.id})}
            />
          ))}
        </View>
      </Card>}

      <Card style={styles.session}>
        <Text>Sách miễn phí</Text>
        <Text style={styles.sessionTitle}>Sách miễn phí dành cho bạn đọc</Text>
        <View>
          {freeBooks.map((book) => (
            <BookItem
              key={book.id.toString()}
              data={book}
              style={{marginVertical: 4, padding: 0}}
              onPress={() => navigation.navigate('BookScreen', {title: book.name, book_id: book.id})}
            />
          ))}
        </View>
        <Button
          type='transparent'
          title={'Xem thêm'}
          onPress={() => navigation.navigate('BooksScreen', {title: 'Sách miễn phí', params: {free: true}})}
        />
      </Card>

      <Card style={styles.session}>
        <Text>Sách mới</Text>
        <Text style={styles.sessionTitle}>Sách mới nhất dành cho bạn đọc</Text>
        <View>
          {newestBooks.map((book) => (
            <BookItem
              key={book.id.toString()}
              data={book}
              style={{marginVertical: 4, padding: 0}}
              onPress={() => navigation.navigate('BookScreen', {title: book.name, book_id: book.id})}
            />
          ))}
        </View>
        <Button
          type='transparent'
          title={'Xem thêm'}
          onPress={() => navigation.navigate('BooksScreen', {title: 'Sách mới nhất', params: {sort_by: 'created_at-desc'}})}
        />
      </Card>

      <Card style={styles.session}>
        <Text>Sách được yêu thích</Text>
        <Text style={styles.sessionTitle}>Sách được yêu thích dành cho bạn đọc</Text>
        <View>
          {mostFavoriteBooks.map((book) => (
            <BookItem
              key={book.id.toString()}
              data={book}
              style={{marginVertical: 4, padding: 0}}
              onPress={() => navigation.navigate('BookScreen', {title: book.name, book_id: book.id})}
            />
          ))}
        </View>
        <Button
          type='transparent'
          title={'Xem thêm'}
          onPress={() => navigation.navigate('BooksScreen', {title: 'Sách được yêu thích nhất', params: {sort_by: 'favorites-desc'}})}
        />
      </Card>

      <Card style={styles.session}>
        <Text>Sách được xem nhiều nhất</Text>
        <Text style={styles.sessionTitle}>Sách được xem nhiều nhất dành cho bạn đọc</Text>
        <View>
          {mostViewedBooks.map((book) => (
            <BookItem
              key={book.id.toString()}
              data={book}
              style={{marginVertical: 4, padding: 0}}
              onPress={() => navigation.navigate('BookScreen', {title: book.name, book_id: book.id})}
            />
          ))}
        </View>
        <Button
          type='transparent'
          title={'Xem thêm'}
          onPress={() => navigation.navigate('BooksScreen', {title: 'Sách được xem nhiều nhất', params: {sort_by: 'views-desc'}})}
        />
      </Card>
    </ScrollView>
  );
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
  sessionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: Dimensions.margin
  },
});
