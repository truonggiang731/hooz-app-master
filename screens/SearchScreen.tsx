import {View, StyleSheet} from 'react-native';
import {ColorScheme, Dimensions} from '@constants';
import Button from '../components/Button';
import SearchIcon from '@icons/search_line.svg';
import Text from '../components/Text';
import {useQuery} from '@tanstack/react-query';
import {CategoryService, Category} from '@services';
import {useState} from 'react';
import LoadingScreen from '../components/LoadingScreen';
import ErrorScreen from '../components/ErrorScreen';
import {Tag} from '@components';
import {StackNavigationProp} from '@react-navigation/stack';
import {AppStackParamList} from '@navigation';
import {useNavigation} from '@react-navigation/native';

export default function SearchScreen() {
  const [categories, setCategories] = useState<Category[]>([]);

  const navigation = useNavigation<StackNavigationProp<AppStackParamList, 'BottomTabs'>>();

  const query = useQuery({
    queryKey: ['categories'],
    queryFn: () => CategoryService.getAllAsync(),
    onSuccess: (data) => {
      setCategories(data.categories);
    }
  });

  if (query.isLoading) {
    return <LoadingScreen />
  }

  if (query.isError) {
    return <ErrorScreen />
  }

  return (
    <View style={styles.container}>
      <Button
        type='secondary'
        title="Bạn muốn tìm sách gì?"
        icon={<SearchIcon height={Dimensions.iconSize} width={Dimensions.iconSize} fill={ColorScheme.placeHolderColor} />}
        titleStyle={{flex: 1, color: ColorScheme.placeHolderColor}}
        style={{marginBottom: Dimensions.margin * 2}}
        onPress={() => navigation.navigate('SearchingScreen')}
      />
      <View style={styles.session}>
        <Text style={styles.sessionTitle}>Thể loại</Text>
        <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
          {categories.map((category) => (
            <Tag
              key={category.id.toString()}
              style={{margin: Dimensions.margin / 2}}
              onPress={() => navigation.navigate('BooksScreen', {title: category.name, params: {category_ids: category.id.toString()}})}
            >
              <Text>{category.name}</Text>
            </Tag>
          ))}
        </View>
      </View>
    </View>
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
  sessionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: Dimensions.margin
  },
  sessionButton: {
    marginBottom: Dimensions.margin
  }
});
