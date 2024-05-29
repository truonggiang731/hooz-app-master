import React, {ComponentProps} from 'react';
import {StyleSheet, TextInput as _TextInput} from 'react-native';
import {ColorScheme, Dimensions} from '@constants';

export type TextInputProps = ComponentProps<typeof _TextInput>;

export default function EditText(props: TextInputProps) {
  const {style, ...otherProps} = props;

  return (
    <_TextInput
      selectionColor={ColorScheme.themeColor}
      placeholderTextColor={ColorScheme.placeHolderColor}
      style={[styles.container, style]}
      {...otherProps}
    >
      {props.children}
    </_TextInput>
  );
}

const styles = StyleSheet.create({
  container: {
    color: ColorScheme.textColor,
    backgroundColor: ColorScheme.secondaryColor,
    paddingHorizontal: Dimensions.padding,
    height: Dimensions.height,
    borderRadius: Dimensions.borderRadius,
    fontSize: Dimensions.fontSize
  }
});
