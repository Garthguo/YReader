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

export default function Test1({content}: {content: string}) {
  const [curIdx, setCurIdx] = useState(10);
  // useGetCconten大概功能是通过文章url获取到的文本的分页数组
  const content1 = useGetCconten(curIdx - 1);
  const content2 = useGetCconten(curIdx);
  const content3 = useGetCconten(curIdx + 1);
  return (
    <View>
      {[...content1, ...content2, ...content3].map(_ => (
        // PageView翻页插件
        <PageView>
          <Text style={{padding: 30, fontSize: 80}}>
            {content.slice(_ * count, _ * count + count)}
          </Text>
        </PageView>
      ))}
    </View>
  );
}
export const Test = () => {
  return (
    <View>
      <Text style={{padding: 30, fontSize: 80}}>Scan</Text>
    </View>
  );
};
