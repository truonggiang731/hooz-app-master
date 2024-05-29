import {
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  Text,
  TouchableOpacityProps,
  ColorValue
} from 'react-native';
import {ColorScheme, Dimensions} from '@constants';
import RightIcon from '@icons/right_line.svg';

export interface ButtonProps extends TouchableOpacityProps {
  type?: 'primary' | 'secondary' | 'transparent' | 'icon';
  title?: string;
  titleStyle?: TextStyle;
  icon?: React.ReactNode;
  showMoreIcon?: boolean;
  moreIconColor?: ColorValue;
}

export default function Button(props: ButtonProps) {
  const {
    style,
    type,
    icon,
    title,
    titleStyle,
    showMoreIcon,
    moreIconColor,
    ...otherProps
  } = props;

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={[
        styles.container,
        type && type === 'secondary'
          ? styles.secondary
          : type === 'icon'
          ? styles.icon
          : type === 'transparent'
          ? styles.transparent
          : styles.primary,
        style
      ]}
      {...otherProps}
    >
      {icon ? icon : null}
      {title ? (
        <Text
          style={[
            styles.title,
            {flex: showMoreIcon ? 1 : undefined},
            {marginLeft: icon ? Dimensions.margin : 0},
            titleStyle
          ]}
        >
          {title}
        </Text>
      ) : null}
      {showMoreIcon ? (
        <RightIcon
          height={Dimensions.iconSize}
          width={Dimensions.iconSize}
          fill={moreIconColor || ColorScheme.textColor}
        />
      ) : null}
      {props.children}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    height: Dimensions.height,
    borderRadius: Dimensions.borderRadius,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    padding: 8,
    backgroundColor: ColorScheme.themeColor
  },
  primary: {
    backgroundColor: ColorScheme.themeColor
  },
  secondary: {
    backgroundColor: ColorScheme.secondaryColor
  },
  transparent: {
    backgroundColor: 'transparent'
  },
  icon: {
    backgroundColor: 'transparent',
    width: Dimensions.height
  },
  title: {
    color: ColorScheme.textColor,
    fontSize: Dimensions.fontSize
  }
});
