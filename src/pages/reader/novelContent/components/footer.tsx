import React, {useLayoutEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  TouchableHighlight,
  View,
  Text,
  Dimensions,
} from 'react-native';
import {Button} from 'react-native-ui-lib';
import * as Animatable from 'react-native-animatable';
import {
  IconAdd,
  IconCategory,
  IconConditions,
  IconDaytimemode,
} from 'src/iconfont';
import {useContentSetStore} from 'src/store/reader';
import ContentSetting from './tools/contentSetting';
import ChapterSwitch from './tools/chapterSwitch';
const size = 30;
const toolRenders = [
  <ChapterSwitch />,
  <Text>IconAdd0</Text>,
  <Text>IconAdd1</Text>,
  <Text>IconAdd2</Text>,
  <ContentSetting />,
];
const Footer = ({visible}) => {
  // const [hide, setHide] = useState(false);
  // const {addFontSize, subFontSize} = useContentSetStore();
  const [currentToolIndex, setCurrentToolIndex] = useState(0);
  const setCurrentIndex = (index: number) => {
    if (index === currentToolIndex) {
      setCurrentToolIndex(0);
    } else {
      setCurrentToolIndex(index);
    }
  };
  return (
    <Animatable.View
      useNativeDriver
      animation={visible ? 'fadeIn' : 'fadeOutDown'}
      duration={200}>
      <View style={style.footerWrap}>
        <ShowIndexComponent index={currentToolIndex} toolRenders={toolRenders}>
          <View style={style.footer}>
            <THH
              onPress={() => {
                setCurrentIndex(0);
              }}
              children={<IconCategory size={size} />}
            />
            <THH
              onPress={() => {
                setCurrentIndex(1);
              }}
              children={<IconAdd size={size} />}
            />
            <THH
              onPress={() => {
                setCurrentIndex(2);
              }}
              children={<IconAdd size={size} />}
            />
            <THH
              onPress={() => {
                setCurrentIndex(3);
              }}
              children={<IconDaytimemode size={size} />}
            />
            <THH
              onPress={() => {
                setCurrentIndex(4);
              }}
              children={<IconConditions size={size} />}
            />
          </View>
        </ShowIndexComponent>
      </View>
    </Animatable.View>
  );
};
const style = StyleSheet.create({
  footerWrap: {
    zIndex: 200,
    position: 'absolute',
    bottom: 0,
    borderTopWidth: 0.5,
    borderTopColor: '#f2f2f2',
  },
  footer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    paddingVertical: 7,
    width: '100%',
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#f2f2f2',
  },
  sheet: {
    backgroundColor: '#ffffff',
    height: 100,
    borderTopWidth: 0.5,
    borderTopColor: '#f2f2f2',
  },
  icon: {
    padding: 5,
    borderRadius: size / 2 + 5,
  },
});
function ShowIndexComponent({index, toolRenders, children}: any) {
  return (
    <>
      {toolRenders[index]}
      {children}
    </>
  );
}
function THH(props: any) {
  const {children, toolRender, hide} = props;
  return (
    <TouchableHighlight
      activeOpacity={0.6}
      style={style.icon}
      underlayColor="#DDDDDD"
      {...props}>
      <View>
        {hide && toolRender}
        {children}
      </View>
    </TouchableHighlight>
  );
}
export default Footer;
