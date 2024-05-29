import {ColorScheme} from '@constants';
import {useNavigation} from '@react-navigation/native';
import { View, TouchableOpacity, Text, ScrollView } from 'react-native'
import RightIcon from '@icons/right_line.svg'
import {useEffect, useState} from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import {AppStackParamList} from '../navigation/Types';
import {BookService} from '@services';
import SearchInput from '../components/SearchInput';

export default function SearchingScreen() {
  const navigation = useNavigation<StackNavigationProp<AppStackParamList, 'SearchingScreen'>>();

  const [searchText, setSearchText] = useState('');
  const [suggestKeywords, setSuggestKeywords] = useState<Array<{keyword: string, type: string, data?: any}>>([]);

  const renderSuggestedKeywordItem = ({item}: any) => (
    <TouchableOpacity
      activeOpacity={0.9}
      style={{
        flexDirection: 'row',
        height: 48,
        alignItems: 'center',
        padding: 8
      }}
      onPress={async () => {
        navigation.navigate('BooksScreen', { title: `Tìm kiếm cho '${item.keyword}'`, params: { query: item.keyword }})}
      }
    >
      <Text numberOfLines={1} style={{flex: 1, color: ColorScheme.textColor}}>{item.keyword}</Text>
      <RightIcon height={20} width={20} fill={ColorScheme.textColor} />
    </TouchableOpacity>
  );

  const fetchSuggestedKeyword = (text: string) => {
    BookService.getSuggestKeywordsAsync(text)
      .then((data) => {
        setSuggestKeywords(data.keywords);
      })
  }

  return (
    <View style={{flex: 1}}>
      <View style={{height: 56, backgroundColor: ColorScheme.primaryColor, flexDirection: 'row', alignItems: 'center'}}>
        <SearchInput
          style={{marginHorizontal: 16}}
          textInputOption={{
            placeholder: 'Tìm kiếm sách',
            value: searchText,
            onChangeText: (text) => {
              setSearchText(text);
              text !== '' && fetchSuggestedKeyword(text);
            }
          }}
          backButtonOption={{
            onPress: () => navigation.goBack()
          }}
          searchButtonOption={{
            onPress: async () => {
              navigation.navigate('BooksScreen', { title: `Tìm kiếm cho '${searchText}'`, params: { query: searchText }});
            }
          }}
        />
      </View>
      {searchText !== '' &&
        <ScrollView
          style={{flex: 1}}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{padding: 16}}>
            <View style={{backgroundColor: ColorScheme.secondaryColor, borderRadius: 8}}>
              {suggestKeywords.map((item) => renderSuggestedKeywordItem({item}))}
            </View>
        </ScrollView>
      }
    </View>
  )
}
