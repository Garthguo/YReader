import React, {useState, useEffect, useCallback} from 'react';
import Header from './components/header';
import Content from './components/content';
import Footer from './components/footer';
import CanvasContent from './components/canvasContent';
import ContentByCanvas from './components/ReaderContent';
import useFirstRender from 'src/hooks/useFirstRender';
import {StatusBar, DeviceEventEmitter} from 'react-native';
import {useContentSetStore} from 'src/store/reader';
import {View} from 'react-native-ui-lib';
import {useMemo} from 'react';
import Content1 from './components/content1';
let count = 0;
let events: any = [];
const NovelContent: React.FC = ({navigation, font}: any) => {
  const [visible, setVisible] = useState<boolean>(false);
  const {bgColor} = useContentSetStore();

  useEffect(() => {
    events.push(
      DeviceEventEmitter.addListener('clickMid', () => {
        setVisible(value => !value);
      }),
    );
    return () => {
      events.reduce((pre, cur) => cur.remove());
    };
  }, []);
  console.log('parent', count++);

  return (
    <View style={{backgroundColor: bgColor}}>
      <StatusBar
        backgroundColor="transparent"
        translucent={true}
        hidden={!visible}
        barStyle={'light-content'}
      />
      {/* {!isFirst && <Header visible={visible} />} */}
      <ContentByCanvas font={font} />
      <Footer visible={visible} />
    </View>
  );
};
export default NovelContent;
