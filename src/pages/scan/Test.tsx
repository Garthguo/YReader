import React, {useRef, useCallback, useState} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import InfinitePager, {Preset} from 'react-native-infinite-pager';
const NUM_ITEMS = 15;

function getColor(i: number) {
  const multiplier = 255 / (NUM_ITEMS - 1);
  const colorVal = Math.abs(i) * multiplier;
  return `rgb(${colorVal}, ${Math.abs(128 - colorVal)}, ${255 - colorVal})`;
}

export default function Test() {
  const [preset, setPreset] = useState<Preset>(Preset.SLIDE);
  const pagerRef = useRef(null);

  const renderPage = useCallback(({index}: {index: number}) => {
    return (
      <View
        style={[
          styles.flex,
          {
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: getColor(index),
          },
        ]}>
        <Text style={{color: 'white', fontSize: 80, fontWeight: 'bold'}}>
          {index}
        </Text>
      </View>
    );
  }, []);

  return (
    <GestureHandlerRootView
      style={[styles.flex, {backgroundColor: 'seashell'}]}>
      <InfinitePager
        key={`infinite-pager-${preset}`}
        ref={pagerRef}
        renderPage={renderPage}
        style={styles.flex}
        pageWrapperStyle={styles.flex}
        preset={preset}
        pageBuffer={4}
        onPageChange={index => {
          console.log(index);
        }}
      />
      <View style={{position: 'absolute', bottom: 44, left: 0, right: 0}}>
        <Text
          style={{
            alignSelf: 'center',
            fontWeight: 'bold',
            color: 'rgba(0,0,0,0.33)',
            padding: 5,
            borderRadius: 3,
            fontSize: 24,
          }}>
          Page Interpolators
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginTop: 12,
          }}>
          {Object.values(Preset).map(k => {
            return (
              <TouchableOpacity
                onPress={() => setPreset(k)}
                style={{
                  paddingVertical: 5,
                  paddingHorizontal: 10,
                  borderRadius: 3,
                  backgroundColor:
                    k === preset ? 'rgba(0,0,0,0.25)' : 'transparent',
                }}>
                <Text style={{color: 'white'}}>{k}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  flex: {flex: 1},
});
const AnimatedPagerView = Animated.createAnimatedComponent(LazyPagerView);
let count1 = 0;
console.log('----------');
let events: any[] = [];
const Content: React.FC = () => {
  const pageRef = useRef(null);
  const pageIndex = useRef(0);
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
  const renderContent = useMemo(
    () => ({content: preLinesArr, title: preTitle}),
    [preLinesArr.length, preTitle],
  );
  // const {content: curContent, title: curTitle} = useChapterForUrl(
  //   ChapterList[curIdx],
  // );
  // const {content: nexContent, title: nexTitle} = useChapterForUrl(
  //   ChapterList[curIdx + 1],
  // );
  setTimeout(() => {}, 2000);
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
    // console.log(pageRef);
    // for (const key in pageRef.current) {
    //   console.log(key);
    // }
    pageRef?.current?.scrollToIndex({index: 5});
  }, 3000);
  const keyExtractor = useCallback(({title}, index) => {
    // console.log(item[index].length);
    return title + index;
  }, []);
  const renderItem = useCallback(({item: {content}, index}) => {
    return (
      <View
        style={{
          height: windowHeight,
          width: windowWidth,
          paddingHorizontal: padding,
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
          {(() => {
            console.log('redner', index);
            return content[index];
          })()}
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
        <VirtualizedList
          getItem={_ => _}
          getItemLayout={({content}, index) => ({
            length: content.length,
            offset: windowWidth,
            index,
          })}
          onViewableItemsChanged={({viewableItems, changed}) => {
            console.log('onViewableItemsChanged', changed);
          }}
          viewabilityConfig={{itemVisiblePercentThreshold: 100}}
          getItemCount={() => preLinesArr.length}
          ref={pageRef}
          pagingEnabled
          scrollEnabled={true}
          data={renderContent}
          horizontal
          ListItemComponent={renderItem}
          keyExtractor={keyExtractor}
        />
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
