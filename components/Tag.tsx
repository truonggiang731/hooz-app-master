import {StyleSheet, TouchableOpacity, TouchableOpacityProps} from "react-native";
import {Dimensions, ColorScheme} from "@constants";

interface CardProps extends TouchableOpacityProps {
}

export default function Card(props: CardProps) {
  const {style, ...otherProps} = props;
  return (
    <TouchableOpacity activeOpacity={0.9} style={[styles.container, style]} {...otherProps}>
      {props.children}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: Dimensions.padding,
    backgroundColor: ColorScheme.secondaryColor,
    borderRadius: Dimensions.borderRadius
  }
});
