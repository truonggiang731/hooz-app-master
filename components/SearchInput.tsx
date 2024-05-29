import {TextInput, TextInputProps, TouchableOpacity, TouchableOpacityProps, View, ViewProps} from "react-native"
import SearchIcon from '@icons/search_line.svg';
import {ColorScheme} from "@constants";
import LeftIcon from '@icons/arrow_left_line.svg';

interface SearchInputProps extends ViewProps {
  textInputOption?: TextInputProps;
  searchButtonOption?: TouchableOpacityProps;
  backButtonOption?: TouchableOpacityProps;
}

export default function SearchInput(props: SearchInputProps) {
  let { textInputOption, searchButtonOption, backButtonOption, style: containerStyle,  ...containerOtherProps } = props;
  const { style: inputStyle, ...inputOtherProps } = textInputOption || {};
  const { style: searchButtonStyle, ...searchButtonOtherProps } = searchButtonOption || {};
  const { style: backButtonStyle, ...backButtonOtherProps } = backButtonOption || {};

  return (
    <View
      style={[{
        height: 48,
        borderRadius: 8,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: ColorScheme.secondaryColor
      }, containerStyle]}
      {...containerOtherProps}
    >

      <TouchableOpacity
        activeOpacity={0.9}
        style={[{height: 48, width: 48, alignItems: 'center', justifyContent: 'center'}, backButtonStyle]}
        {...backButtonOtherProps}
      >
        <LeftIcon width={24} height={24} fill={ColorScheme.textColor} />
      </TouchableOpacity>
      <TextInput
        autoFocus={true}
        style={[
          {flex: 1, color: ColorScheme.textColor},
          inputStyle
        ]}
        placeholderTextColor={ColorScheme.placeHolderColor}
        cursorColor={ColorScheme.themeColor}
        selectionColor={ColorScheme.themeColor}
        {...inputOtherProps}
      />
      <TouchableOpacity
        activeOpacity={0.9}
        style={[{height: 48, width: 48, alignItems: 'center', justifyContent: 'center'}, searchButtonStyle]}
        {...searchButtonOption}
      >
        <SearchIcon width={24} height={24} fill={ColorScheme.textColor} />
      </TouchableOpacity>
    </View>
  )
}
