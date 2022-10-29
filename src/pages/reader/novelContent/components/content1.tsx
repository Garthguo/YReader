import {
  Text,
  useWindowDimensions,
  StyleSheet,
  View,
  StatusBar,
} from 'react-native';
import React, {
  useCallback,
  useRef,
  useState,
  useLayoutEffect,
  useEffect,
} from 'react';
import {useContentSetStore} from 'src/store/reader';
import useChapterForUrl, {getChapterForFun} from 'src/hooks/useChapterForUrl';
import ChapterList from 'src/assets/js/data';
import {parseContent} from 'src/util/parse';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import InfinitePager, {Preset} from 'react-native-infinite-pager';
import {useMMKVNumber, useMMKVObject, useMMKV} from 'react-native-mmkv';
const fontCount = {height: 1};
let type = '';
const Content: React.FC = () => {
  const storage = useMMKV();
  const {current = '{"idx":5,"offset":0}'} = useRef(
    storage.getString('book-address'),
  );
  console.log(current);
  const page = JSON.parse(current);
  const curIdx = page.idx;
  const pageRef = useRef(null);
  const [firstShow, setFirstShow] = useState(true);
  const [bool, setbool] = useState(true);
  const windowHeight = useWindowDimensions().height;
  const windowWidth = useWindowDimensions().width;
  const DATA = useRef<IData>({
    LEFT: {contents: [], pagesCount: []},
    RIGHT: {contents: [], pagesCount: []},
  });
  const {fontSize, lineCount, fontFamily, padding, textColor} =
    useContentSetStore();
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
  const [content, setContent] = useState<any>(null);
  const [curLinesArr, setCurLinesArr] = useState<any[]>([]);
  const [nexLinesArr, setNexLinesArr] = useState<any[]>([]);
  const [preLinesArr, setPreLinesArr] = useState<any[]>([]);
  fontCount.height = Math.floor((windowHeight - padding * 2) / lineHeight);

  useLayoutEffect(() => {
    if (
      preLinesArr.length > 1 &&
      curLinesArr.length > 1 &&
      nexLinesArr.length > 1 &&
      bool
    ) {
      console.log(
        'useLayoutEffect',
        preLinesArr.length,
        curLinesArr.length,
        nexLinesArr.length,
      );
      DATA.current.RIGHT.contents.push(...curLinesArr);
      DATA.current.RIGHT.contents.push(...nexLinesArr);
      DATA.current.LEFT.contents.push(...preLinesArr.reverse());
      DATA.current.RIGHT.pagesCount.push(curLinesArr.length);
      DATA.current.RIGHT.pagesCount.push(nexLinesArr.length);
      DATA.current.LEFT.pagesCount.push(preLinesArr.length);
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
  const addPreContent = useCallback((arr: any) => {
    if (arr.length === 1) {
      return;
    }
    if (type === 'pre') {
      console.log('preDddPreContent', arr.length);
      DATA.current.LEFT.pagesCount.push(arr.length);
      DATA.current.LEFT.contents.push(...arr.reverse());
      type = '';
    } else if (type === 'nex') {
      console.log('nexDddPreContent', arr.length);
      DATA.current.RIGHT.pagesCount.push(arr.length);
      DATA.current.RIGHT.contents.push(...arr);
      type = '';
    }
  }, []);

  const renderPage = useCallback(({index}: {index: number}) => {
    if (index < 0) {
      return (
        <View style={{padding}}>
          <Text style={style.title}>
            {DATA.current.LEFT.contents[-index - 1]?.title ?? `${index}`}
          </Text>
          <Text style={textStyle}>
            {DATA.current.LEFT.contents[-index - 1]?.content ?? ''}
          </Text>
        </View>
      );
    } else {
      return (
        <View style={{padding}}>
          <Text style={style.title}>
            {DATA.current.RIGHT.contents[index]?.title ?? `${index}`}
          </Text>
          <Text style={textStyle}>
            {DATA.current.RIGHT.contents[index]?.content ?? ''}
          </Text>
        </View>
      );
    }
  }, []);
  return (
    <>
      <View style={[{padding}, style.noPlay]}>
        <Text
          style={[textStyle]}
          onTextLayout={({nativeEvent}) => {
            const lineArr = nativeEvent.lines.map(txt => {
              return txt.text;
            });
            setPreLinesArr(parseContent(lineArr, fontCount.height, preTitle));
          }}>
          {preContent}
        </Text>
        <Text
          style={[textStyle]}
          onTextLayout={text => {
            const lineArr = text.nativeEvent.lines.map(txt => {
              return txt.text;
            });
            setCurLinesArr(parseContent(lineArr, fontCount.height, curTitle));
          }}>
          {curContent}
        </Text>
        <Text
          style={[textStyle]}
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
          style={[textStyle]}
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
        <GestureHandlerRootView style={[style.warp]}>
          <InfinitePager
            key="infinite-pager"
            ref={pageRef}
            PageComponent={renderPage}
            style={[styles.flex]}
            pageWrapperStyle={style.warp}
            preset={Preset.SLIDE}
            pageBuffer={5}
            initPage={page.offset}
            width={windowWidth}
            onPageChange={index => {
              const copyDATA = DATA.current;
              if (
                index === -sum(copyDATA.LEFT.pagesCount.slice(0, -1)) - 1 &&
                !bool
              ) {
                type = 'pre';
                const idx = curIdx - copyDATA.LEFT.pagesCount.length;
                getChapterForFun(ChapterList[idx - 1]).then(
                  ({content, title}) => {
                    setContent({content, title});
                  },
                );
              } else if (
                index === sum(copyDATA.RIGHT.pagesCount.slice(0, -1))
              ) {
                type = 'nex';
                getChapterForFun(
                  ChapterList[curIdx + copyDATA.RIGHT.pagesCount.length],
                ).then(({content, title}) => {
                  setContent({content, title});
                });
              }
              console.log('getRealPage', getRealPage(curIdx, index, copyDATA));
              storage.set(
                'book-address',
                JSON.stringify(getRealPage(curIdx, index, copyDATA)),
              );
            }}
          />
        </GestureHandlerRootView>
      )}
    </>
  );
};
const getRealPage = (curIdx, index, copyDATA) => {
  if (index < 0) {
    let offset = -index;
    for (let i = 0; i < copyDATA.LEFT.pagesCount.length + 1; i++) {
      if (offset <= 0) {
        console.log('offset', -offset);
        return {offset: -offset, idx: curIdx - i};
      }
      offset -= copyDATA.LEFT.pagesCount[i];
    }
  } else {
    let offset = index;
    for (let i = 0; i < copyDATA.RIGHT.pagesCount.length + 1; i++) {
      offset -= copyDATA.RIGHT.pagesCount[i];
      if (offset <= 0) {
        return {
          // offset: offset === 0 ? 0 : offset + copyDATA.RIGHT.pagesCount[i - 1],
          // idx: index === 0 ? curIdx : curIdx + i,
          offset: offset === 0 ? 0 : offset + copyDATA.RIGHT.pagesCount[i],
          idx: offset === 0 ? curIdx + i + 1 : curIdx + i,
        };
      }
    }
  }
};
const styles = StyleSheet.create({
  flex: {flex: 1},
});

const style = StyleSheet.create({
  warp: {
    width: '100%',
    height: '100%',
  },
  noPlay: {
    pointerEvents: 'none',
    position: 'absolute',
    left: 0,
    top: 0,
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
const sum = (arr: number[]): number => {
  return arr.reduce((pre, _) => pre + _, 0);
};
export default React.memo(Content);
