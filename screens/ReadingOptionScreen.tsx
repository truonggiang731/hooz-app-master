import {View, StyleSheet, ScrollView} from "react-native";
import {ColorScheme, Dimensions} from "@constants";
import {setDefaultReadingOption, setReadingOption} from "@redux/readingOptionSlide";
import {TriangleColorPicker, fromHsv} from 'react-native-color-picker';
import {useAppSelector, useAppDispatch} from "@hooks";
import {Button, Card, Text} from "@components";
import {useState} from "react";
import Slider from '@react-native-community/slider';

import AlignJustifyIcon from '@icons/align_justify_line.svg';
import AlignRightIcon from '@icons/align_right_line.svg';
import AlignLeftIcon from '@icons/align_left_line.svg';
import AlignCenterIcon from '@icons/align_center_line.svg';

export default function ReadingOptionScreen() {
  const readingOption = useAppSelector(state => state.readingOption);
  const dispatch = useAppDispatch();

  const [selectedColor, setSelectedColor] = useState<{
    property: 'color' | 'backgroundColor',
    value: string
  }>({
    property: 'color',
    value: readingOption.color
  });

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.containerContent}
    >
      <Card style={styles.session}>
        <Text style={styles.title}>Cỡ chữ</Text>
        <Slider
          style={{height: 40}}
          minimumValue={0}
          maximumValue={20}
          value={readingOption.fontSize - 16}
          minimumTrackTintColor={ColorScheme.themeColor}
          maximumTrackTintColor={ColorScheme.placeHolderColor}
          thumbTintColor={ColorScheme.themeColor}
          onValueChange={value => dispatch(setReadingOption({
            ...readingOption,
            fontSize: 16 + value
          }))}
        />
      </Card>
      <Card style={styles.session}>
        <Text style={styles.title}>Căn chỉnh</Text>
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <Button
            type="icon"
            icon={<AlignJustifyIcon height={Dimensions.iconSize} width={Dimensions.iconSize} fill={readingOption.textAlign === 'justify' ? ColorScheme.themeColor : ColorScheme.textColor} />}
            onPress={() => dispatch(setReadingOption({...readingOption, textAlign: 'justify'}))}
          />
          <Button
            type="icon"
            icon={<AlignLeftIcon height={Dimensions.iconSize} width={Dimensions.iconSize} fill={readingOption.textAlign === 'left' ? ColorScheme.themeColor : ColorScheme.textColor} />}
            onPress={() => dispatch(setReadingOption({...readingOption, textAlign: 'left'}))}
          />
          <Button
            type="icon"
            icon={<AlignRightIcon height={Dimensions.iconSize} width={Dimensions.iconSize} fill={readingOption.textAlign === 'right' ? ColorScheme.themeColor : ColorScheme.textColor} />}
            onPress={() => dispatch(setReadingOption({...readingOption, textAlign: 'right'}))}
          />
          <Button
            type="icon"
            icon={<AlignCenterIcon height={Dimensions.iconSize} width={Dimensions.iconSize} fill={readingOption.textAlign === 'center' ? ColorScheme.themeColor : ColorScheme.textColor} />}
            onPress={() => dispatch(setReadingOption({...readingOption, textAlign: 'center'}))}
          />
        </View>
      </Card>
      <Card style={styles.session}>
        <Text style={styles.title}>Màu</Text>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <TriangleColorPicker
            hideSliders
            hideControls
            style={{height: 240, width: 240}}
            defaultColor={selectedColor.value}
            onColorChange={color => {
              setSelectedColor({...selectedColor, value: fromHsv(color)});
              if (selectedColor.property === 'color') {
                dispatch(setReadingOption({
                  ...readingOption,
                  color: fromHsv(color)
                }));
              } else {
                dispatch(setReadingOption({
                  ...readingOption,
                  backgroundColor: fromHsv(color)
                }));
              }
            }}
          />
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <Button
            style={{backgroundColor: readingOption.color, height: 48, width: 48, marginHorizontal: 4}}
            onPress={() => setSelectedColor({property: 'color', value: readingOption.color})}
          />
          <Button
            style={{backgroundColor: readingOption.backgroundColor, height: 48, width: 48, marginHorizontal: 4}}
            onPress={() => setSelectedColor({property: 'backgroundColor', value: readingOption.backgroundColor})}
          />
        </View>
      </Card>
      <Card style={styles.session}>
        <Text style={styles.title}>Xem trước</Text>
        <Card style={{backgroundColor: readingOption.backgroundColor}}>
          <Text
            style={{
              color: readingOption.color,
              fontSize: readingOption.fontSize,
              fontWeight: readingOption.fontWeight,
              textAlign: readingOption.textAlign
            }}
          >
            Việc đọc sách mỗi ngày là một thói quen tốt có thể giúp bạn phát triển trí tuệ, tăng khả năng tập trung và giảm căng thẳng. Bằng cách dành một khoảng thời gian nhất định để đọc sách mỗi ngày, bạn có thể tập trung vào việc nâng cao kiến thức và kỹ năng của mình, đồng thời cũng tạo ra một thói quen tốt cho bản thân.
          </Text>
        </Card>
      </Card>
      <Button type="secondary" title="Khôi phục mặc định" onPress={() => dispatch(setDefaultReadingOption())} />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  containerContent: {
    paddingHorizontal: 16,
    paddingBottom: 16
  },
  session: {
    marginBottom: 8
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 2
  }
});
