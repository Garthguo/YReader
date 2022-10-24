import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  DeviceEventEmitter,
} from 'react-native';
import {Button, Text, View} from 'react-native-ui-lib';
import {IconArrowLeft, IconArrowRight, IconRightarrow} from 'src/iconfont';

const ChapterSwitch = () => {
  const width = useWindowDimensions().width;
  return (
    <View style={[style.wrap, {width}]} flex row center>
      <TouchableOpacity
        onPress={() => {
          console.log('DeviceEventEmitter');
          DeviceEventEmitter.emit('changeChapter', 'pre');
        }}>
        <IconArrowLeft size={45} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => DeviceEventEmitter.emit('changeChapter', 'next')}>
        <IconArrowRight size={45} />
      </TouchableOpacity>
    </View>
  );
};
export default ChapterSwitch;
const style = StyleSheet.create({
  wrap: {
    // width: '100%',
    paddingHorizontal: 10,
    paddingVertical: 5,
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
  },
});
