import React from "react";
import {View, ViewProps, StyleSheet, ColorValue, ViewStyle, TouchableOpacity} from "react-native";
import {ColorScheme, Dimensions} from "@constants";
import CheckCircleFillIcon from '@icons/check_circle_fill.svg';

export interface RadioListProps extends ViewProps {
  itemContainerStyle?: ViewStyle;
  itemContentContainerStyle?: ViewStyle;
  data?: Array<any>;
  itemContent?: ({item, index}: {item: any, index: number}) => React.ReactNode;
  initialSelectedIndex?: number;
  tintColor?: ColorValue;
  onSelectionChanged?: ({item, index}: {item: any, index: number}) => void;
}

export interface RadioListState {
  selectedIndex: number
}

export default class RadioList extends React.Component<RadioListProps, RadioListState> {
  constructor(props: RadioListProps) {
    super(props);
    const { initialSelectedIndex } = props;
    this.state = { selectedIndex: initialSelectedIndex || 0 };

    if (this.props.data && this.props.data.length != 0 && this.props.onSelectionChanged) {
      this.props.onSelectionChanged({
        item: this.props.data[initialSelectedIndex || 0],
        index: initialSelectedIndex || 0
      })
    }
  }

  render() {
    const { data, itemContent, style, itemContainerStyle, onSelectionChanged, ...otherProps } = this.props;

    return (
      <View style={[styles.container, style]} {...otherProps}>
        {data ? data.map((item: any, index: number) => (
          <TouchableOpacity
            key={index}
            activeOpacity={0.9}
            style={[styles.item, itemContainerStyle]}
            onPress={() => {
              this.setState({selectedIndex: index});

              if (onSelectionChanged) {
                onSelectionChanged({item, index});
              }
            }}
          >
            <View style={styles.iconContainer}>
              {index == this.state.selectedIndex ?
                <CheckCircleFillIcon height={24} width={24} fill={this.props.tintColor || ColorScheme.themeColor} />
                :
                <View style={{height: 24, width: 24}} />
              }
            </View>
            <View style={styles.contentContainer}>
              {itemContent ? itemContent({item, index}) : null}
            </View>
          </TouchableOpacity>
        )) : null}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
  },
  item: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: ColorScheme.secondaryColor,
    borderRadius: Dimensions.borderRadius,
    padding: 8,
    marginVertical: 2
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  contentContainer: {
    flex: 1,
    marginLeft: 8
  }
})
