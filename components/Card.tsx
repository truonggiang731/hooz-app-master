import {View, ViewProps, StyleSheet} from "react-native";
import {Dimensions, ColorScheme} from "@constants";

interface CardProps extends ViewProps {
}

export default function Card(props: CardProps) {
  const {style, ...otherProps} = props;
  return (
    <View style={[styles.container, style]} {...otherProps}>
      {props.children}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: Dimensions.padding,
    backgroundColor: ColorScheme.secondaryColor,
    borderRadius: Dimensions.borderRadius
  }
});
