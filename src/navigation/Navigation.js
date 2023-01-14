// In App.js in a new project

import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Player from '../screen/musicPlayer/Player';
import MusicList from '../screen/musicList/MusicList';


const Stack = createNativeStackNavigator();

function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'  screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen name="Home" component={Player} />
        <Stack.Screen name="MusicList" component={MusicList} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;