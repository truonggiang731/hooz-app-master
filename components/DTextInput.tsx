import React from 'react';
import {
  StyleSheet,
  TextInput as _TextInput,
  ViewProps,
  TextInputProps as _TextInputProps,
  View,
  ViewStyle
} from 'react-native';
import {ColorScheme, Dimensions} from '@constants';

interface ITextInputProps extends ViewProps {
  textInput?: _TextInputProps;
  leftArea?: React.ReactNode;
  rightArea?: React.ReactNode;
  leftAreaStyle?: ViewStyle;
  rightAreaStyle?: ViewStyle;
}

export default function EditText(props: ITextInputProps) {
  const {style, textInput, leftArea, rightArea, leftAreaStyle, rightAreaStyle, ...otherProps} = props;
  const {style: textInputStyle, ...otherTextInputProps} = textInput || {};

  return (
    <View style={[styles.container, style]} {...otherProps}>
      {leftArea && <View style={[styles.leftContainer, leftAreaStyle]}>{props.leftArea}</View>}
      <_TextInput
        selectionColor={ColorScheme.themeColor}
        placeholderTextColor={ColorScheme.placeHolderColor}
        style={[
          styles.textInput,
          {
            borderTopLeftRadius: leftArea ? 0 : Dimensions.borderRadius,
            borderBottomLeftRadius: leftArea ? 0 : Dimensions.borderRadius,
            borderTopRightRadius: rightArea ? 0 : Dimensions.borderRadius,
            borderBottomRightRadius: rightArea ? 0 : Dimensions.borderRadius,

            paddingLeft: leftArea ? 0 : Dimensions.padding,
            paddingRight: rightArea ? 0 : Dimensions.padding
          },
          textInputStyle
        ]}
        {...otherTextInputProps}
      >
        {props.children}
      </_TextInput>
      {rightArea && <View style={[styles.rightContainer, rightAreaStyle]}>{props.rightArea}</View>}
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
  leftContainer: {
    height: Dimensions.height,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: ColorScheme.secondaryColor,
    borderTopLeftRadius: Dimensions.borderRadius,
    borderBottomLeftRadius: Dimensions.borderRadius
  },
  rightContainer: {
    height: Dimensions.height,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: ColorScheme.secondaryColor,
    borderTopRightRadius: Dimensions.borderRadius,
    borderBottomRightRadius: Dimensions.borderRadius
  },
  textInput: {
    flex: 1,
    color: ColorScheme.textColor,
    backgroundColor: ColorScheme.secondaryColor,
    height: Dimensions.height,
    fontSize: Dimensions.fontSize
  }
});
