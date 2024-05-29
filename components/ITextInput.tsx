import React, {ComponentProps} from 'react';
import {
  StyleSheet,
  TextInput as _TextInput,
  ViewProps,
  TextInputProps as _TextInputProps,
  View
} from 'react-native';
import {ColorScheme, Dimensions} from '@constants';

interface ITextInputProps extends ViewProps {
  textInput?: _TextInputProps;
  icon: React.ReactNode;
}

export default function EditText(props: ITextInputProps) {
  const {style, textInput, ...otherProps} = props;
  const {style: textInputStyle, ...otherTextInputProps} = textInput || {};

  return (
    <View style={[styles.container, style]} {...otherProps}>
      <View style={styles.iconContainer}>{props.icon}</View>
      <_TextInput
        selectionColor={ColorScheme.themeColor}
        placeholderTextColor={ColorScheme.placeHolderColor}
        style={[styles.textInput, textInputStyle]}
        {...otherTextInputProps}
      >
        {props.children}
      </_TextInput>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    color: ColorScheme.textColor,
    backgroundColor: ColorScheme.secondaryColor,
    height: Dimensions.height,
    borderRadius: Dimensions.borderRadius
  },
  iconContainer: {
    height: Dimensions.height,
    width: Dimensions.height,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: ColorScheme.secondaryColor,
    borderTopLeftRadius: Dimensions.borderRadius,
    borderBottomLeftRadius: Dimensions.borderRadius
  },
  textInput: {
    flex: 1,
    color: ColorScheme.textColor,
    backgroundColor: ColorScheme.secondaryColor,
    paddingRight: Dimensions.padding,
    height: Dimensions.height,
    borderTopRightRadius: Dimensions.borderRadius,
    borderBottomRightRadius: Dimensions.borderRadius,
    fontSize: Dimensions.fontSize
  }
});
