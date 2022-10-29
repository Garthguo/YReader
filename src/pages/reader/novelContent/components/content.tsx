import {
  Text,
  useWindowDimensions,
  TouchableWithoutFeedback,
  StyleSheet,
  View,
  DeviceEventEmitter,
  StatusBar,
} from 'react-native';
import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import {useContentSetStore} from 'src/store/reader';
import {PagerView} from 'react-native-pager-view';
import useChapterForUrl from 'src/hooks/useChapterForUrl';
import ChapterList from 'src/assets/js/data';
import {parseContent, getKeyString} from 'src/util/parse';

const fontCount = {height: 1};
console.log('----------');
let events: any[] = [];
const Content: React.FC = () => {
  const pageRef = useRef(null);
  const pageIndex = useRef(0);
  const [show, setShow] = useState(true);
  const [curIdx, setCurIdx] = useState(10);
  const [scroll, setScroll] = useState(true);
  const windowHeight = useWindowDimensions().height;
  const {fontSize, lineCount, fontFamily, padding, textColor} =
    useContentSetStore();
  const lineHeight = fontSize * lineCount;
  const [preLinesArr, setPreLinesArr] = useState<any[]>([]);
  const [curLinesArr, setCurLinesArr] = useState<any[]>([]);
  const [nexLinesArr, setNexLinesArr] = useState<any[]>([]);
  //console.log('----------');
  //console.log(count++);
  const {
    content: curContent,
    title: curTitle,
    get: preGet,
  } = useChapterForUrl(ChapterList[curIdx]);
  const {
    content: preContent,
    title: preTitle,
    get: curGet,
  } = useChapterForUrl(ChapterList[curIdx - 1]);
  const {
    content: nexContent,
    title: nexTitle,
    get: nexGet,
  } = useChapterForUrl(ChapterList[curIdx + 1]);
  fontCount.height = Math.floor((windowHeight - padding * 2) / lineHeight);

  useLayoutEffect(() => {
    if (preLinesArr.length && curLinesArr.length && nexLinesArr.length) {
      pageRef.current.setPageWithoutAnimation(preLinesArr.length);
    }
  }, [preLinesArr.length, curLinesArr.length, nexLinesArr.length]);
  useEffect(() => {
    events.push(
      DeviceEventEmitter.addListener('changeChapter', type => {
        if (type === 'next') {
          //console.log(type);
          setCurIdx(idx => idx + 1);
        } else {
          //console.log(type);
          setCurIdx(idx => idx - 1);
        }
      }),
    );
    return () => {
      events.reduce((pre, cur) => cur.remove());
    };
  }, []);

  const textStyle = {
    fontSize,
    lineHeight,
    fontFamily,
    color: textColor,
  };
  return (
    <TouchableWithoutFeedback>
      <PagerView
        overdrag={true}
        ref={pageRef}
        style={style.warp}
        scrollEnabled={scroll}
        orientation="horizontal"
        onPageSelected={(e, position) => {
          if (preGet && curGet && nexGet && show) {
            if (
              e.nativeEvent.position < preLinesArr.length &&
              e.nativeEvent.position !== 0 &&
              preLinesArr.length
            ) {
              console.log('setIdx-1', e.nativeEvent.position);
              //console.log('当前页', e.nativeEvent.position);
              //console.log('----------------------------------------');
              // setTimeout(() => {
              // pageRef.current.setPageWithoutAnimation(preLinesArr.length - 1);
              setCurIdx(i => i - 1);
              bool = false;
              // }, 1000);
            } else if (
              e.nativeEvent.position >=
                preLinesArr.length + curLinesArr.length &&
              curLinesArr.length &&
              preLinesArr.length
            ) {
              setCurIdx(i => i + 1);
            }
          }
        }}>
        {show && (
          <View key={`${ChapterList[curIdx - 1]}--0`} style={[{padding}]}>
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
              {preLinesArr[0]?.content}
            </Text>
          </View>
        )}
        {show &&
          preLinesArr.slice(1, preLinesArr.length).map((content, idx) => {
            const index = idx + 1;
            return (
              <View
                key={`${ChapterList[curIdx - 1]}--${index}`}
                style={[{padding}]}>
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
                  {content.content}
                </Text>
              </View>
            );
          })}
        <View key={`${ChapterList[curIdx]}--0`} style={[{padding}]}>
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
            {curLinesArr[0]?.content}
          </Text>
        </View>
        {curLinesArr.slice(1, curLinesArr.length).map((content, idx) => {
          const index = idx + 1;
          return (
            <View key={`${ChapterList[curIdx]}--${index}`} style={[{padding}]}>
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
                {content.content}
              </Text>
            </View>
          );
        })}
        <View key={`${ChapterList[curIdx + 1]}--0`} style={[{padding}]}>
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
            {nexLinesArr[0]?.content}
          </Text>
        </View>
        {nexLinesArr.slice(1, nexLinesArr.length).map((content, idx) => {
          const index = idx + 1;
          return (
            <View
              key={`${ChapterList[curIdx + 1]}--${index}`}
              style={[{padding}]}>
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
                {content.content}
              </Text>
            </View>
          );
        })}
      </PagerView>
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
    // position: 'absolute',
    zIndex: 10,
    height: StatusBar.currentHeight,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default React.memo(Content, props => {
  //console.log('props', props);
  return true;
});
