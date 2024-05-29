import {View, ViewProps, StyleSheet} from "react-native";
import {Dimensions, ColorScheme} from "@constants";

interface ScreenContainerProps extends ViewProps {
}

export default function ScreenContainer(props: ScreenContainerProps) {
  const {style, ...otherProps} = props;
  return (
    <View style={[styles.container, style]} {...otherProps}>
      {props.children}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Dimensions.padding * 2,
    backgroundColor: ColorScheme.primaryColor,
  }
});
