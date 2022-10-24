import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  StatusBar,
} from 'react-native';
import NovelContent from './novelContent';
import novelList from './novelList';

import IconFont, {IconNames} from '../../iconfont';
import {Button} from 'react-native-ui-lib';
import {useContentSetStore} from 'src/store/reader';

const Stack = createNativeStackNavigator();
const HeaderCustom = () => {
  return (
    <View style={[Style.search, {paddingTop: StatusBar.currentHeight}]}>
      {/* <View style={[Style.search]}> */}
      <TouchableHighlight
        activeOpacity={0.6}
        underlayColor="#ddd"
        style={{borderRadius: Style.search_child.borderRadius}}
        onPress={() => console.log(1)}>
        <View style={Style.search_child}>
          <IconFont onPress={() => {}} name={'search'} size={25} />

          <View style={Style.search_right}>
            <View style={Style.border} />
            <Button
              activeBackgroundColor={'#000'}
              backgroundColor={'#ecedf1'}
              iconSource={() => (
                <IconFont onPress={() => {}} name={'add-select'} size={25} />
              )}
            />
          </View>
        </View>
      </TouchableHighlight>
    </View>
  );
};
const ReaderScreen: React.FC = ({navigation}: any) => {
  const {bgColor} = useContentSetStore();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="NovelList"
        component={novelList}
        // options={{headerShown: false}}
        options={{
          headerShadowVisible: false,
          header: HeaderCustom,
        }}
      />
      <Stack.Screen
        name="NovelContent"
        component={NovelContent}
        options={{
          contentStyle: {
            backgroundColor: bgColor,
          },
          headerShown: false,
          animation: 'fade',
        }}
      />
    </Stack.Navigator>
  );
};
const Style = StyleSheet.create({
  search: {
    display: 'flex',
    marginHorizontal: 20,
    marginVertical: 10,
  },
  search_child: {
    padding: 6,
    paddingRight: 15,
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#ecedf1',
    justifyContent: 'space-between',
    borderRadius: 15,
    overflow: 'hidden',
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
});
export default ReaderScreen;
