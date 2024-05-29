import {Dimensions as _Dimensions} from 'react-native';
import Constants from 'expo-constants';

const width = _Dimensions.get('window').width;
const height = _Dimensions.get('window').height;
const statusBarHeight = Constants.statusBarHeight;

const Dimensions = {
  statusBar: {
    height: statusBarHeight
  },
  window: {
    width,
    height
  },
  height: 48,
  width: 120,
  margin: 8,
  padding: 8,
  borderRadius: 8,
  fontSize: 16,
  iconSize: 24
};

export default Dimensions;
