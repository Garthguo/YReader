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
  FlatList,
} from 'react-native';
import React, {useEffect, useCallback, useRef, useState} from 'react';
import {useContentSetStore} from 'src/store/reader';
import {LazyPagerView} from 'react-native-pager-view';
import useChapterForUrl from 'src/hooks/useChapterForUrl';
import ChapterList from 'src/assets/js/data';
import {parseContent} from 'src/util/parse';
const Stack = createNativeStackNavigator();
let count = 0;
const AnimatedPagerView = Animated.createAnimatedComponent(LazyPagerView);
let count1 = 0;
const fontCount = {height: 1};
console.log('----------');
let events: any[] = [];
const Content: React.FC = () => {
  const pageRef = useRef(null);
  const pageIndex = useRef(0);
  const [show, setShow] = useState(false);
  const [curIdx, setCurIdx] = useState(10);
  const [scroll, setScroll] = useState(true);
  const windowHeight = useWindowDimensions().height;
  const windowWidth = useWindowDimensions().width;
  const {fontSize, lineCount, fontFamily, padding, textColor} =
    useContentSetStore();
  const lineHeight = fontSize * lineCount;
  const [preLinesArr, setPreLinesArr] = useState<any[]>(['']);
  const [curLinesArr, setCurLinesArr] = useState<any[]>([]);
  const [nexLinesArr, setNexLinesArr] = useState<any[]>([]);
  console.log('----------');
  console.log(count++);
  const {content: preContent, title: preTitle} = useChapterForUrl(
    ChapterList[curIdx - 1],
  );
  // const {content: curContent, title: curTitle} = useChapterForUrl(
  //   ChapterList[curIdx],
  // );
  // const {content: nexContent, title: nexTitle} = useChapterForUrl(
  //   ChapterList[curIdx + 1],
  // );
  setTimeout(() => {
    setShow(true);
  }, 0);
  fontCount.height = Math.floor((windowHeight - padding * 2) / lineHeight);
  useEffect(() => {
    events.push(
      DeviceEventEmitter.addListener('changeChapter', type => {
        if (type === 'next') {
          console.log(type);
          setCurIdx(idx => idx + 1);
        } else {
          console.log(type);
          setCurIdx(idx => idx - 1);
        }
      }),
    );
    return () => {
      events.reduce((pre, cur) => cur.remove());
    };
  }, []);
  setTimeout(() => {
    pageRef?.current?.ScrollToIndex(3000);
  }, 3000);
  const keyExtractor = useCallback((item: any, index) => String(index), []);
  const renderItem = useCallback(({item}) => {
    return (
      <View
        style={{
          height: windowHeight,
          width: windowWidth,
          backgroundColor: '#eee',
        }}>
        <Text
          selectable
          style={[
            textStyle,
            {
              width: '100%',
              minHeight: windowHeight - padding * 2,
            },
          ]}>
          {item}
        </Text>
      </View>
    );
  }, []);
  const textStyle = {
    fontSize,
    lineHeight,
    fontFamily,
    color: textColor,
  };
  return (
    <TouchableWithoutFeedback>
      <View style={{height: '100%', width: '100%'}}>
        <View key={122} style={[{padding}]}>
          <Text
            style={[textStyle, style.noPlay]}
            onTextLayout={text => {
              const lineArr = text.nativeEvent.lines.map(txt => {
                return txt.text;
              });
              console.log('lineArr.length', lineArr.length);
              setPreLinesArr(parseContent(lineArr, fontCount.height));
            }}>
            {preContent}
          </Text>
        </View>
        <FlatList
          ref={pageRef}
          scrollEnabled={true}
          data={preLinesArr}
          horizontal
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          // renderItem={({item, index}) => {
          //   // console.log('renderItem', item);
          //   return (
          // <View style={{flex: 1, backgroundColor: '#eee'}}>
          //   <Text
          //     selectable
          //     style={[
          //       textStyle,
          //       {
          //         width: '100%',
          //         minHeight: windowHeight - padding * 2,
          //       },
          //     ]}>
          //     {item}
          //   </Text>
          // </View>
          //   );
          // }}
        />
        {/* {show && (
          <View key={122} style={[{padding}]}>
            <Text
              style={[textStyle, style.noPlay]}
              onTextLayout={text => {
                const lineArr = text.nativeEvent.lines.map(txt => {
                  return txt.text;
                });
                setPreLinesArr(parseContent(lineArr, fontCount.height));
              }}>
              {preContent}
            </Text>
            <Text style={style.title}>{preTitle}</Text>
            <Text
              onPress={() => {
                DeviceEventEmitter.emit('clickMid');
                setScroll(!scroll);
              }}
              selectable
              style={[
                textStyle,
                style.firstPage,
                {
                  minHeight: windowHeight - padding * 2,
                },
              ]}>
              {preLinesArr[0]}
            </Text>
          </View>
        )}
        {show &&
          preLinesArr.slice(1, preLinesArr.length).map((content, idx) => {
            const index = idx + 1;
            return (
              <View key={index} style={[{padding}]}>
                <Text style={style.title}>{preTitle}</Text>
                <Text
                  onPress={() => {
                    DeviceEventEmitter.emit('clickMid');
                    setScroll(!scroll);
                  }}
                  selectable
                  style={[
                    textStyle,
                    {
                      minHeight: windowHeight - padding * 2,
                    },
                  ]}>
                  {content}
                </Text>
              </View>
            );
          })}
        <View key={222} style={[{padding}]}>
          <Text
            style={[textStyle, style.noPlay]}
            onTextLayout={text => {
              const lineArr = text.nativeEvent.lines.map(txt => {
                return txt.text;
              });
              setCurLinesArr(parseContent(lineArr, fontCount.height));
            }}>
            {curContent}
          </Text>
          <Text style={style.title}>{curTitle}</Text>
          <Text
            onPress={() => {
              DeviceEventEmitter.emit('clickMid');
              setScroll(!scroll);
            }}
            selectable
            style={[
              textStyle,
              style.firstPage,
              {
                minHeight: windowHeight - padding * 2,
              },
            ]}>
            {curLinesArr[0]}
          </Text>
        </View>
        {curLinesArr.slice(1, curLinesArr.length).map((content, idx) => {
          const index = idx + 1;
          return (
            <View key={index} style={[{padding}]}>
              <Text style={style.title}>{curTitle}</Text>
              <Text
                onPress={() => {
                  DeviceEventEmitter.emit('clickMid');
                  setScroll(!scroll);
                }}
                selectable
                style={[
                  textStyle,
                  {
                    minHeight: windowHeight - padding * 2,
                  },
                ]}>
                {content}
              </Text>
            </View>
          );
        })}
        <View key={322} style={[{padding}]}>
          <Text
            style={[textStyle, style.noPlay]}
            onTextLayout={text => {
              const lineArr = text.nativeEvent.lines.map(txt => {
                return txt.text;
              });
              setNexLinesArr(parseContent(lineArr, fontCount.height));
            }}>
            {nexContent}
          </Text>
          <Text style={style.title}>{nexTitle}</Text>
          <Text
            onPress={() => {
              DeviceEventEmitter.emit('clickMid');
              setScroll(!scroll);
            }}
            selectable
            style={[
              textStyle,
              style.firstPage,
              {
                minHeight: windowHeight - padding * 2,
              },
            ]}>
            {nexLinesArr[0]}
          </Text>
        </View>
        {nexLinesArr.slice(1, nexLinesArr.length).map((content, idx) => {
          const index = idx + 1;
          return (
            <View key={index} style={[{padding}]}>
              <Text style={style.title}>{nexTitle}</Text>
              <Text
                onPress={() => {
                  DeviceEventEmitter.emit('clickMid');
                  setScroll(!scroll);
                }}
                selectable
                style={[
                  textStyle,
                  {
                    minHeight: windowHeight - padding * 2,
                  },
                ]}>
                {content}
              </Text>
            </View>
          );
        })} */}
        {/* </AnimatedPagerView> */}
      </View>
    </TouchableWithoutFeedback>
  );
};
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
const Scan: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="novelList"
        component={Content}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};
export default Scan;
const Test2: React.FC = () => {
  const [list] = useState([{id: 0}, {id: 1}, {id: 2}]);

  const keyExtractor = useCallback((item: any) => String(item.id), []);
  const renderItem = useCallback(({item}) => {
    const content = new Array(1000).fill(Math.random());

    return (
      <ScrollView style={{flex: 1, backgroundColor: '#eee'}}>
        <Text style={{fontSize: 40, fontWeight: 'bold', color: 'red'}}>
          {item.id}
        </Text>
        <Text>{content.join('')}</Text>
      </ScrollView>
    );
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      <AnimatedPagerView
        style={{flex: 1}}
        data={list}
        initialPage={0}
        buffer={1}
        maxRenderWindow={3}
        orientation="horizontal"
        keyExtractor={keyExtractor}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
};
