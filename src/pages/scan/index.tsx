import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  Text,
  SafeAreaView,
  useWindowDimensions,
  TouchableWithoutFeedback,
  StyleSheet,
  View,
  DeviceEventEmitter,
  StatusBar,
  Animated,
  ScrollView,
  VirtualizedList,
} from 'react-native';
import React, {
  useEffect,
  useCallback,
  useRef,
  useState,
  useMemo,
  useLayoutEffect,
} from 'react';
const data = Array(1000000);
console.log(data.length);

let midIndex: number = 5000;
import {useContentSetStore} from 'src/store/reader';
import useChapterForUrl, {getChapterForFun} from 'src/hooks/useChapterForUrl';
import ChapterList from 'src/assets/js/data';
import {parseContent} from 'src/util/parse';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import InfinitePager, {Preset} from 'react-native-infinite-pager';
const Stack = createNativeStackNavigator();
const fontCount = {height: 1};

const Scan: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="novelList"
        component={Test2}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};
export default Scan;
let countIndex = 0;
const Test2: React.FC = () => {
  const pageRef = useRef(null);
  const [bool, setbool] = useState(true);
  const windowHeight = useWindowDimensions().height;
  console.log('windowHeight', windowHeight);

  const {fontSize, lineCount, fontFamily, padding, textColor} =
    useContentSetStore();
  const cur = useRef(10);
  const memo = useRef({
    midIndex,
    preLen: 0,
    curLen: 0,
    nexLen: 0,
    prePreL: 0,
    count: 2,
  });
  const curIdx = cur.current;
  const lineHeight = fontSize * lineCount;
  const {content: preContent, title: preTitle} = useChapterForUrl(
    ChapterList[curIdx - 1],
  );
  const {content: curContent, title: curTitle} = useChapterForUrl(
    ChapterList[curIdx],
  );
  const {content: nexContent, title: nexTitle} = useChapterForUrl(
    ChapterList[curIdx + 1],
  );
  const [content, setContent] = useState('');
  const [curLinesArr, setCurLinesArr] = useState<any[]>([]);
  const [nexLinesArr, setNexLinesArr] = useState<any[]>([]);
  const [preLinesArr, setPreLinesArr] = useState<any[]>([]);
  fontCount.height = Math.floor((windowHeight - padding * 2) / lineHeight);
  console.log('fontCount.height', fontCount.height, lineHeight);

  // const data = preLinesArr.concat(curLinesArr).concat(nexLinesArr);
  useLayoutEffect(() => {
    // console.log(preLinesArr);

    console.log(
      'useLayoutEffect',
      preLinesArr.length,
      curLinesArr.length,
      nexLinesArr.length,
    );
    if (
      preLinesArr.length > 1 &&
      curLinesArr.length > 1 &&
      nexLinesArr.length > 1 &&
      bool
    ) {
      console.log(preLinesArr.length, curLinesArr.length, nexLinesArr.length);

      data.splice(midIndex, curLinesArr.length, ...curLinesArr);
      data.splice(
        midIndex - preLinesArr.length,
        preLinesArr.length,
        ...preLinesArr,
      );
      data.splice(
        midIndex + curLinesArr.length,
        nexLinesArr.length,
        ...nexLinesArr,
      );
      memo.current.preLen = preLinesArr.length;
      memo.current.curLen = curLinesArr.length;
      memo.current.nexLen = nexLinesArr.length;
      console.log('this is current');
      setbool(false);
    }
  }, [preLinesArr.length, curLinesArr.length, nexLinesArr.length]);
  const textStyle = {
    fontSize,
    lineHeight,
    fontFamily,
    color: textColor,
  };
  const addPreContent = useCallback(arr => {
    if (arr.length === 1) return;
    const mid = memo.current.midIndex;
    const pre = memo.current.preLen;
    console.log('addPreContent', mid, arr.length);
    memo.current.prePreL = memo.current.preLen;
    memo.current.preLen += arr.length;
    data.splice(mid - pre - arr.length, arr.length, ...arr);
  }, []);

  const renderPage = useCallback(
    ({index}: {index: number}) => {
      const mid = memo.current.midIndex;
      const pre = memo.current.preLen;
      const cur = memo.current.curLen;
      const nex = memo.current.nexLen;
      return (
        <View
          style={[
            styles.flex,
            {
              alignItems: 'center',
              // justifyContent: 'center',
              padding,
            },
          ]}>
          <Text style={textStyle}>{data[index + mid]?.content ?? ''}</Text>
          <Text
            style={{
              color: '#000',
              fontSize: 40,
              fontWeight: 'bold',
              position: 'absolute',
            }}>
            {data[index + mid]?.title ?? `${index + mid}-${pre}-${cur}-${nex}`}
          </Text>
        </View>
      );
    },
    [preLinesArr.length, curLinesArr.length, nexLinesArr.length, countIndex],
  );
  return (
    <SafeAreaView style={{flex: 1}}>
      <View key={122} style={[{padding}]}>
        <Text
          style={[textStyle, style.noPlay]}
          onTextLayout={text => {
            const lineArr = text.nativeEvent.lines.map(txt => {
              return txt.text;
            });
            // console.log(parseContent(lineArr, fontCount.height).length);
            setPreLinesArr(parseContent(lineArr, fontCount.height, preTitle));
          }}>
          {preContent}
        </Text>
        <Text
          style={[textStyle, style.noPlay]}
          onTextLayout={text => {
            const lineArr = text.nativeEvent.lines.map(txt => {
              return txt.text;
            });
            // console.log(parseContent(lineArr, fontCount.height).length);
            setCurLinesArr(parseContent(lineArr, fontCount.height, curTitle));
          }}>
          {curContent}
        </Text>
        <Text
          style={[textStyle, style.noPlay]}
          onTextLayout={text => {
            const lineArr = text.nativeEvent.lines.map(txt => {
              return txt.text;
            });
            // console.log(parseContent(lineArr, fontCount.height).length);
            setNexLinesArr(parseContent(lineArr, fontCount.height, nexTitle));
          }}>
          {nexContent}
        </Text>
        <Text
          style={[textStyle, style.noPlay]}
          onTextLayout={text => {
            const lineArr = text.nativeEvent.lines.map(txt => {
              return txt.text;
            });
            console.log('lineArrUpdate-------------------');
            // console.log(parseContent(lineArr, fontCount.height, nexTitle));
            addPreContent(
              parseContent(lineArr, fontCount.height, content?.title),
            );
          }}>
          {content?.content}
        </Text>
      </View>
      {!bool && (
        <GestureHandlerRootView
          style={[styles.flex, {backgroundColor: 'seashell'}]}>
          <InfinitePager
            key={`infinite-pager-slide`}
            ref={pageRef}
            renderPage={renderPage}
            style={styles.flex}
            pageWrapperStyle={styles.flex}
            preset="slide"
            pageBuffer={4}
            onPageChange={index => {
              console.log(
                'onPageChangeindex:' + index + ',' + curLinesArr.length,
              );
              const mid = memo.current.midIndex;
              const preL = memo.current.preLen;
              const prePreL = memo.current.prePreL;
              console.log('index:', index);
              if (index + mid === mid - prePreL - 1 && preL > 1 && !bool) {
                console.log('mid - prePreL:', mid - prePreL - 1);
                getChapterForFun(
                  ChapterList[curIdx - memo.current.count++],
                ).then(({content, title}) => {
                  setContent({content, title});
                });
              }
            }}
          />
        </GestureHandlerRootView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  flex: {flex: 1},
});
const NUM_ITEMS = 15;

function getColor(i: number) {
  const multiplier = 255 / (NUM_ITEMS - 1);
  const colorVal = Math.abs(i) * multiplier;
  return `rgb(${colorVal}, ${Math.abs(128 - colorVal)}, ${255 - colorVal})`;
}
const style = StyleSheet.create({
  warp: {
    // marginTop: StatusBar.currentHeight,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
  },
  noPlay: {
    pointerEvents: 'none',
    position: 'absolute',
    left: 0,
    top: 0,
    zIndex: -100,
    opacity: 0,
  },
  firstPage: {
    zIndex: 100,
  },
  title: {
    display: 'flex',
    zIndex: 10,
    height: StatusBar.currentHeight,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
