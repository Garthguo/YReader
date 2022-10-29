import {createNativeStackNavigator} from '@react-navigation/native-stack';

import React from 'react';
import {Test} from './Test';
const Stack = createNativeStackNavigator();

const Scan: React.FC = () => {
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
export default Scan;
