import React, {useState, useEffect, useCallback} from 'react';
import Header from './components/header';
import Content from './components/content';
import Footer from './components/footer';
import useFirstRender from 'src/hooks/useFirstRender';
import {StatusBar, DeviceEventEmitter} from 'react-native';
import {useContentSetStore} from 'src/store/reader';
import {View} from 'react-native-ui-lib';
import {useMemo} from 'react';
import Content1 from './components/content1';
let count = 0;
let events = [];
const NovelContent: React.FC = ({navigation}: any) => {
  const [visible, setVisiable] = useState<boolean>(false);
  const isFirst = useFirstRender();
  const {bgColor} = useContentSetStore();

  useEffect(() => {
    events.push(
      DeviceEventEmitter.addListener('clickMid', () => {
        setVisiable(visible => !visible);
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
      {/* {!first.current && <Header visible={visible} />} */}
      <Content1 />
      {!isFirst && <Footer visible={visible} />}
    </View>
  );
};
export default NovelContent;
