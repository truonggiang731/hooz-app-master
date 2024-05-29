import {Book} from "@services";
import {Image, TouchableOpacity, TouchableOpacityProps, View, StyleSheet} from "react-native";
import {ColorScheme, Dimensions} from "@constants";
import Text from "./Text";

interface BookItemProps extends TouchableOpacityProps {
  data: Book;
}

export default function BookItem(props: BookItemProps) {
  const {style, data, ...rest} = props;

  return (
    <TouchableOpacity activeOpacity={0.9} style={[styles.container, style]} {...rest}>
      <Image source={{uri: data.image_url}} style={{height: 120, width: 90, borderRadius: Dimensions.borderRadius}} />
      <View style={{marginLeft: 8, flex: 1}}>
        <Text numberOfLines={1} style={{fontWeight: 'bold', marginBottom: 4}}>{data.name}</Text>
        <Text numberOfLines={1} style={{marginBottom: 4, fontSize: 12}}>{data.author}</Text>
        <Text numberOfLines={4} style={{textAlign: 'justify', fontSize: 12}}>{data.description}</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: Dimensions.padding,
    backgroundColor: ColorScheme.secondaryColor,
    borderRadius: Dimensions.borderRadius
  }
});
