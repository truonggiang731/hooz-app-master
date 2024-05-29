import {useQuery} from "@tanstack/react-query";
import {useNavigation, useRoute} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import {useEffect, useMemo} from 'react';
import {AppStackParamList} from "@navigation";
import {BookService} from "@services";
import LoadingScreen from "../components/LoadingScreen";
import ErrorScreen from "../components/ErrorScreen";
import WebView from "react-native-webview";
import useAppSelector from "../hooks/useAppSelector";
import {AxiosError} from "axios";

export default function PolicyAndTermScreen() {
  const readingOption = useAppSelector(state => state.readingOption);

  const navigation = useNavigation<StackNavigationProp<AppStackParamList, 'ReadingScreen'>>();
  const route = useRoute<RouteProp<AppStackParamList, 'ReadingScreen'>>();
  const {book_id, chapter_id} = route.params;

  const query = useQuery<any, AxiosError>({
    queryKey: ['book', book_id, 'chapter', chapter_id],
    queryFn: () => BookService.getChapterAsync(chapter_id),
    retry: false
  })

  useEffect(() => {
    const willFocusSubscription = navigation.addListener('focus', () => {
      query.refetch();
    });

    return willFocusSubscription;
  }, [navigation]);

  const html = useMemo(
    () => `<div style="padding: 0px 8px; color: ${readingOption.color}; font-size: ${readingOption.fontSize}px; font-weight: ${readingOption.fontWeight}; text-align: ${readingOption.textAlign}">${query.data ? query.data.chapter.content : ''}</div>`,
    [query.data, readingOption]
  );

  if (query.isLoading) {
    return <LoadingScreen />
  }

  if (query.isError) {
    if (query.error.response && query.error.response.status == 403) {
      return (
        <ErrorScreen
          messages={['Bạn cần mua gói để sử dụng tài nguyên này']}
          buttonText={'Mua gói ngay'}
          onButtonPress={() => navigation.navigate('PlansScreen')}
        />
      )
    }

    return (
      <ErrorScreen
        onButtonPress={() => {
          query.refetch();
        }}
      />
    )
  }

  return (
    <WebView
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      style={{resizeMode: 'cover', flex: 1, backgroundColor: readingOption.backgroundColor}}
      source={{html: html}}
      scalesPageToFit={false}
    />
  )
}
