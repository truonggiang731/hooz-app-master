import React, {Component} from 'react';
import {ViewProps, StyleSheet, View} from 'react-native';
import {ColorScheme} from '@constants';
import Button from './Button';
import Text from './Text';

export interface ErrorScreenProps extends ViewProps {
  onPress?: () => void;
  onButtonPress?: () => void;
  buttonText?: string;
  messages?: Array<string>;
}

export default class ErrorScreen extends Component<ErrorScreenProps> {
  static defaultProps = {
    theme: 'light',
    buttonText: 'Tải lại',
    messages: ['Có lỗi xảy ra!', 'Hãy kiểm tra lại kết nối!']
  }

  constructor(props: ErrorScreenProps) {
    super(props);
  }

  render() {
    const { style, ...otherProps } = this.props;

    return (
      <View style={[styles.container, style]} {...otherProps}>
        {this.props.messages?
          this.props.messages.map((item, index) => (
            <Text key={index} style={{marginBottom: 8}}>{item}</Text>
          ))
          :
          null
        }
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Button
            type='secondary'
            onPress={this.props.onPress || this.props.onButtonPress}
          >
            <Text>{this.props.buttonText? this.props.buttonText : 'Tải lại'}</Text>
          </Button>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: ColorScheme.primaryColor
  }
})

