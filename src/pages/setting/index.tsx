import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {Text, View} from 'react-native';

const Stack = createNativeStackNavigator();
const Test = () => {
  return (
    <View>
      <Text style={{padding: 30, fontSize: 80}}>Set</Text>
    </View>
  );
};
const Setting: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="novelList"
        component={Test}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};
export default Setting;
