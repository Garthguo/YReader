import React from 'react';
import {
  Button,
  StatusBar,
  // SafeAreaView,
  StyleSheet,
  Text,
  // useColorScheme,
  View,
} from 'react-native';

import IconFont, {IconNames} from './iconfont';

require('react-native-ui-lib/config').setConfig({appScheme: 'default'});
// import {Colors} from 'react-native/Libraries/NewAppScreen';

import {
  getFocusedRouteNameFromRoute,
  NavigationContainer,
  DefaultTheme,
} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import SHOW_TAB_BAR_LIST from './pages/CONST';
import ReaderScreen from './pages/reader';
import Scan from './pages/scan';
import Setting from './pages/setting';

const Tab = createBottomTabNavigator();

function NovelTabs() {
  return (
    <Tab.Navigator
      initialRouteName="阅读"
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color}) => {
          let iconName: IconNames;
          switch (route.name) {
            case '阅读':
              iconName = 'all';
              break;
            case '设置':
              iconName = 'set';
              break;
            case '浏览':
              iconName = 'form';
              break;
            default:
              iconName = 'all';
          }
          return (
            <View style={Style.bar}>
              <IconFont
                name={focused ? `${iconName}-fill` : iconName}
                color={color}
                size={27}
              />
              {focused && (
                <Text style={{...Style.barText, color}}>{route.name}</Text>
              )}
            </View>
          );
        },
        tabBarActiveTintColor: '#1892a6',
        tabBarInactiveTintColor: 'gray',
        tabBarLabelPosition: 'beside-icon',
        tabBarActiveBackgroundColor: '#e2f1f4',
        tabBarItemStyle: {
          borderRadius: 15,
          marginHorizontal: 15,
          marginVertical: 10,
        },
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
          ...getTabBarStyle(route),
          height: 60,
        },
      })}>
      <Tab.Screen name="浏览" component={Scan} />
      <Tab.Screen
        name="阅读"
        component={ReaderScreen}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen name="设置" component={Setting} />
    </Tab.Navigator>
  );
}

const App = () => {
  return (
    <NavigationContainer theme={MyTheme}>
      <StatusBar
        translucent={true}
        backgroundColor="transparent"
        barStyle={'dark-content'}
      />
      <NovelTabs />
    </NavigationContainer>
  );
};
const getTabBarStyle = (route: any) => {
  const routeName = getFocusedRouteNameFromRoute(route);
  let display = SHOW_TAB_BAR_LIST.includes(routeName ?? '阅读')
    ? 'flex'
    : 'none';
  return {display};
};
const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'rgb(255, 45, 85)',
    background: '#fff',
  },
};
const Style = StyleSheet.create({
  bar: {
    display: 'flex',
    flexDirection: 'row',
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  barText: {
    fontWeight: 'bold',
  },
});
export default App;
