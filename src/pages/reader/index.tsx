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

import IconFont from '../../iconfont';
import {Button} from 'react-native-ui-lib';
import SearchPreShow from './novelSearch';
import {useNavigation} from '@react-navigation/native';
import SearchDetail from './novelSearch/searchDetail';

const Stack = createNativeStackNavigator();
const HeaderCustom = () => {
  const navigation = useNavigation();
  return (
    <View style={[Style.search, {paddingTop: StatusBar.currentHeight}]}>
      <TouchableHighlight
        activeOpacity={0.6}
        underlayColor="#ddd"
        style={{borderRadius: Style.search_child.borderRadius}}
        onPress={() => navigation.navigate('NovelPreShow')}>
        <View style={Style.search_child}>
          <IconFont onPress={() => {}} name={'search'} size={23} />
          <View style={Style.search_right}>
            <View style={Style.border} />
            <Button
              activeBackgroundColor={'#000'}
              backgroundColor={'#ecedf1'}
              iconSource={() => (
                <IconFont onPress={() => {}} name={'add-select'} size={23} />
              )}
            />
          </View>
        </View>
      </TouchableHighlight>
    </View>
  );
};
const ReaderScreen: React.FC = ({navigation}: any) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="NovelList"
        component={novelList}
        options={{
          headerShadowVisible: false,
          header: HeaderCustom,
        }}
      />
      <Stack.Screen
        name="NovelContent"
        component={NovelContent}
        options={{
          headerShown: false,
          animation: 'fade',
        }}
      />
      <Stack.Screen
        name="NovelPreShow"
        component={SearchPreShow}
        options={{
          headerShown: false,
          animation: 'fade',
        }}
      />
      {/* <Stack.Screen
        name="NovelSearchList"
        component={SearchDetail}
        options={{
          headerShown: false,
          animation: 'fade',
        }}
      /> */}
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
    borderRadius: 999,
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
