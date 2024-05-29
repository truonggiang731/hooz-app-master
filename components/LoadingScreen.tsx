import React from 'react';
import {ViewProps, StyleSheet, View, ActivityIndicator} from 'react-native';
import {ColorScheme} from '@constants';
import {ColorValue} from 'react-native';

export interface LoadingScreenProps extends ViewProps {
  color?: ColorValue;
  size?: number | 'small' | 'large';
}

export default function LoadingScreen(props: LoadingScreenProps) {
  const {style, color, size, ...otherProps} = props;

  return (
    <View style={[styles.container, style]} {...otherProps}>
      <ActivityIndicator
        size={size || 'large'}
        color={color || ColorScheme.themeColor}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: ColorScheme.primaryColor
  }
});
