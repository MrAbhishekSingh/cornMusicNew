import { View, Text, StatusBar, StyleSheet } from 'react-native'
import React from 'react'
import Player from './src/screen/musicPlayer/Player'
import { colorNew } from './src/modal/color'
import Navigation from './src/navigation/Navigation'

const App = () => {
  return (
    <View style={{flex:1,backgroundColor:colorNew.theme}}>
      <Navigation/>
    </View>
  )
}

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ECF0F1',
  },
  buttonsContainer: {
    padding: 10,
  },
  textStyle: {
    textAlign: 'center',
    marginBottom: 8,
  },
});