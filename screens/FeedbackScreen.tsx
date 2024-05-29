import { useState } from "react";
import { View, StyleSheet, ScrollView, Alert } from "react-native";
import { Button, LoadingScreen, TextInput } from "@components";
import {FeedbackService} from "@services";
import {useNavigation} from "@react-navigation/native";
import {AppStackParamList} from "@navigation";
import {StackNavigationProp} from "@react-navigation/stack";

export default function ResetPasswordScreen() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  const navigation = useNavigation<StackNavigationProp<AppStackParamList, 'FeedbackScreen'>>();

  const sendFeedback = async () => {
    setIsLoading(true);
    try {
      await FeedbackService.sendFeedbackAsync({ title, content });
      navigation.goBack();
      Alert.alert('Thông báo', 'Gửi thành công');
    } catch (error) {
      Alert.alert('Lỗi', 'Có lỗi đã xảy ra');
    }

    setIsLoading(false);
  }

  if (isLoading) {
    <LoadingScreen />
  }

  return (
    <View style={styles.container}>
      <View
        style={{flex: 1, paddingVertical: 8, paddingHorizontal: 16}}
      >
        <TextInput
          style={{marginBottom: 4}}
          autoFocus={true}
          placeholder={'Tiêu đề'}
          onChangeText={value => setTitle(value)}
          value={title}
        />
        <TextInput
          style={{flex: 1, marginTop: 4, textAlignVertical: 'top'}}
          secureTextEntry={true}
          multiline={true}
          placeholder={'Nội dung'}
          onChangeText={value => setContent(value)}
          value={content}
        />
      </View>
      <Button
        type='primary'
        style={{margin: 16}}
        title={'Gửi'}
        titleStyle={{fontWeight: 'bold'}}
        onPress={sendFeedback}
      />
    </View>
  )
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})
