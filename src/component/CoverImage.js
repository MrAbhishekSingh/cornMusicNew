import { View, Text } from 'react-native'
import React from 'react'
import { Image } from 'react-native-svg'

const CoverImage = (props) => {
  return (
    <View style={{flex:1}}>
      
      <Image
        style={{heigth:'100%',width:'100%'}}
        source={props.source}
      />
    </View>
  )
}

export default CoverImage