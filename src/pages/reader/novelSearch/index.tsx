import {View, Chip, Text} from 'react-native-ui-lib';
import React, {useRef, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  TouchableHighlight,
  StyleSheet,
  StatusBar,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import IconFont from 'src/iconfont';
import {useMMKVObject} from 'react-native-mmkv';
import SearchDetail from './searchDetail';
const SearchPreShow = () => {
  const [history = [], setHistory] = useMMKVObject<string[]>('user.history');
  const [searchText, setSearxhText] = useState('');
  const [isShowHistory, setIsShowHistory] = useState(true);
  const navigation = useNavigation();
  const inputRet = useRef(null);
  const clickText = (text: string) => {
    console.log(text);
    setSearxhText(text);
    setIsShowHistory(false);
    setHistory(
      [text, ...history].filter((txt, index) => txt !== text || index === 0),
    );
  };
  return (
    <View style={Style.wrap}>
      <View style={[Style.search, {paddingTop: StatusBar.currentHeight}]}>
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => {
            if (!isShowHistory) {
              return setIsShowHistory(true);
            }
            navigation.goBack();
          }}
          style={Style.left_child}>
          <IconFont name={'arrow-left'} size={30} />
        </TouchableOpacity>
        <TouchableHighlight
          activeOpacity={0.6}
          underlayColor="#ddd"
          style={[
            {borderRadius: Style.search_child.borderRadius},
            Style.right_child,
          ]}>
          <View style={Style.search_child}>
            <IconFont name={'search'} size={23} />
            <TextInput
              ref={inputRet}
              autoFocus
              defaultValue={searchText}
              placeholder="输入书名或作者"
              style={Style.search_child.search_child_input}
              onSubmitEditing={({nativeEvent: {text}}) => clickText(text)}
            />
            <IconFont
              color="#5e6265"
              onPress={() => {
                inputRet?.current!.clear();
              }}
              name="reeor-fill"
              size={23}
            />
          </View>
        </TouchableHighlight>
      </View>
      {isShowHistory ? (
        <View style={Style.history_wrap}>
          <Text style={Style.history_text}>
            搜索历史：{' '}
            <Text
              onPress={() => setHistory([])}
              style={[Style.history_text, {color: Style.history_list.color}]}>
              清空
            </Text>
          </Text>
          <View style={Style.history_content}>
            {history.map((text, index) => (
              <Text
                key={index}
                onPress={() => {
                  clickText(text);
                }}
                style={Style.history_list}>
                {text}
              </Text>
            ))}
          </View>
        </View>
      ) : (
        <SearchDetail text={searchText} />
      )}
    </View>
  );
};
export default SearchPreShow;
const Style = StyleSheet.create({
  wrap: {
    marginHorizontal: 20,
    marginVertical: 10,
  },
  search: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    // paddingLeft: 10,
    // marginRight: 20,
  },
  search_child: {
    padding: 6,
    paddingRight: 15,
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#ecedf1',
    // justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 999,
    overflow: 'hidden',
    search_child_input: {
      height: 23,
      width: 300,
      padding: 0,
      margin: 0,
      marginLeft: 6,
      flex: 1,
    },
  },
  right_child: {
    flexGrow: 30,
  },
  left_child: {
    flexGrow: 1,
    // marginRight: 20,
    // position: 'relative',
    // left: -20,
  },
  search_right: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  border: {
    height: 20,
    marginRight: 15,
    borderLeftColor: '#b1b2b6',
    borderLeftWidth: 0.5,
    borderStyle: 'solid',
  },
  history_wrap: {
    // marginTop: 20,
  },
  history_text: {
    marginVertical: 20,
    fontSize: 15,
    fontWeight: 'bold',
  },
  history_content: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  history_list: {
    borderColor: '#1e1e1e',
    // borderWidth: 1,
    color: '#5e6265',
    fontSize: 15,
    marginRight: 10,
    marginBottom: 10,
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 5,
    backgroundColor: '#ecedf1',
  },
});
