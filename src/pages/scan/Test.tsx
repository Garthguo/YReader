import React, {useRef, useCallback, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import InfinitePager, {Preset} from 'react-native-infinite-pager';

export default function Test({content}: {content: string}) {
  const fontSize = 30,
    lineHeight = 50;
  const width = useWindowDimensions().width;
  const height = useWindowDimensions().height;
  const count = (width / fontSize) * (height / lineHeight);
  return (
    <View>
      {[0, 1, 2, 3, 4, 5].map(_ => (
        <Text style={{padding: 30, fontSize: 80}}>
          {content.slice(_ * count, _ * count + count)}
        </Text>
      ))}
    </View>
  );
}
const style = StyleSheet.create({
  wrap: {
    columns: 0,
  },
});
