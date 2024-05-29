import {View, StyleSheet, ScrollView, ImageBackground, TouchableOpacity, Alert} from "react-native"
import {ColorScheme, Dimensions} from "@constants";
import {useMutation, useQuery} from "@tanstack/react-query";
import {useNavigation, useRoute} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import {AppStackParamList} from "@navigation";
import {Book, BookService} from "@services";
import {useEffect, useState} from "react";
import {Card, Text, Button} from "@components";
import LoadingScreen from "../components/LoadingScreen";
import ErrorScreen from "../components/ErrorScreen";

import HeartLineIcon from '@icons/heart_line.svg';
import HeartFillIcon from '@icons/heart_fill.svg';

export default function BookScreen() {
  const [book, setBook] = useState<Book>();

  const navigation = useNavigation<StackNavigationProp<AppStackParamList, 'BookScreen'>>();
  const route = useRoute<RouteProp<AppStackParamList, 'BookScreen'>>();
  const {book_id} = route.params;

  const query = useQuery({
    queryKey: ['book', book_id],
    queryFn: () => BookService.getDetailAsync(book_id),
    onSuccess: (data) => {
      setBook(data.book);
    }
  });

  const favorite = useMutation({
    mutationFn: () => BookService.favoriteAsync(book_id, !query.data.book.favorited),
    onSettled: () => query.refetch()
  });

  useEffect(() => {
    const willFocusSubscription = navigation.addListener('focus', () => {
      query.refetch();
    });

    return willFocusSubscription;
  }, [navigation]);

  if (query.isLoading) {
    return <LoadingScreen />
  }

  if (query.isError) {
    return <ErrorScreen />
  }

  return (
    <ImageBackground
      source={{uri: book?.image_url}}
      style={styles.container}
    >
    <ScrollView
      style={{backgroundColor: 'transparent'}}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      stickyHeaderIndices={[1]}
    >
      <View style={{height: Dimensions.window.height / 2, justifyContent: 'center', alignItems: 'center'}}>
      </View>
      <View style={{backgroundColor: `${ColorScheme.primaryColor}`, paddingHorizontal: 16}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
          }}
        >
          <Button
            style={{flex: 1, marginRight: 4, marginVertical: 8}}
            icon={
              book?.favorited
              ? <HeartFillIcon width={24} height={24} fill={ColorScheme.themeColor} />
              : <HeartLineIcon width={24} height={24} fill={ColorScheme.themeColor} />
            }
            title="Yêu thích"
            titleStyle={{color: book?.favorited ? ColorScheme.themeColor : ColorScheme.textColor}}
            type="secondary"
            onPress={() => {
              if (book) {
                setBook({...book, favorited: !book.favorited});
                favorite.mutateAsync()
                  .catch(() => {
                    setBook({...book, favorited: !book.favorited});
                  });
              }
            }}
          />
          <Button
            style={{flex: 1, marginLeft: 4, marginVertical: 8, width: 180}}
            title={book?.reading_chapter ? 'Đọc tiếp' : 'Đọc ngay'}
            onPress={() => {
              if (book?.chapters?.length === 0) {
                Alert.alert('Thông báo', 'Sách chưa có chương nào');
                return;
              }

              let chapter = book?.chapters?.at(0);
              if (book?.reading_chapter) {
                chapter = book?.reading_chapter;
              }

              navigation.navigate('ReadingScreen', {title: chapter?.name, chapter_id: chapter?.id!, book_id});
            }}
          />
        </View>
      </View>
      <View style={{minHeight: Dimensions.window.height - 118, paddingHorizontal: 16, backgroundColor: `${ColorScheme.primaryColor}`}}>
        <View style={{marginBottom: 8}}>
          {book?.free && <Text>{'Sách miễn phí'}</Text>}
          <Text style={{fontWeight: 'bold', marginBottom: 4, fontSize: 20}}>{book?.name}</Text>
          <View style={{flexDirection: 'column', alignItems: 'flex-start'}}>
            {book?.other_names !== '' && <Text>{book?.other_names}</Text>}
            {book?.author !== '' && <Text>{book?.author}</Text>}
          </View>
        </View>

        <View style={{marginBottom: 8}}>
          <Text style={{fontWeight: 'bold', marginBottom: 4}}>Nội dung</Text>
          <Text style={{textAlign: 'justify'}}>{book?.description}</Text>
        </View>
        <View style={{marginBottom: 8}}>
          <Text style={{fontWeight: 'bold', marginBottom: 4}}>Danh sách chương</Text>
          <View>
            {book?.chapters?.map((chapter, index) => (
              <TouchableOpacity
                activeOpacity={0.9}
                key={chapter.id.toString()}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginVertical: 4
                }}
                onPress={() => navigation.navigate('ReadingScreen', {title: chapter.name, chapter_id: chapter.id, book_id})}
                >
                <Card style={{flex: 1, height: 40, justifyContent: 'center'}}>
                  <Text>{chapter.name}</Text>
                </Card>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    </ScrollView>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ColorScheme.primaryColor
  }
});
