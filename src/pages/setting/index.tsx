import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {Text} from 'react-native';

const Stack = createNativeStackNavigator();
const Test = () => {
  return <Text>Test</Text>;
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
