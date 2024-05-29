import {Text as _Text, TextProps as _TextProps, StyleSheet} from 'react-native';
import {ColorScheme, Dimensions} from '@constants';

interface TextProps extends _TextProps {}

export default function Text(props: TextProps) {
  const {style, ...otherProps} = props;

  return (
    <_Text style={[styles.text, style]} {...otherProps}>
      {props.children}
    </_Text>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: Dimensions.fontSize,
    color: ColorScheme.textColor
  }
});
