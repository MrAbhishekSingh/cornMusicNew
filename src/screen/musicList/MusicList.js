import { View, Text, FlatList, ImageBackground,Pressable,TouchableOpacity } from 'react-native'
import React from 'react'
import { colorNew } from '../../modal/color'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import music from '../../assete/music.jpg'

const songs = Array(100).fill(null)

const aarr = [1, 1, 1, 1, 3, 3, 4, 4, 45, 5, 5, 5]
const MusicList = () => {
    return (
        <View style={{
            flex: 1,
            backgroundColor: colorNew.theme,
            paddingHorizontal: hp('3%')
        }}>
            <FlatList
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                data={aarr}
                keyExtractor={(item, index) => String(index)}
                renderItem={({ index, item }) => (
                    // <View style={{ flex:1, justifyContent: 'center', alignItems: 'center'}}>
                    <TouchableOpacity style={{elevation:10}}>
                    <ImageBackground
                    style={{
                        borderWidth: hp('0.4%'),
                        borderColor: '#fff',
                        height: hp('20%'),
                        width: '100%',
                        marginVertical: 10,
                        borderRadius: 8,
                        overflow: 'hidden',
                        justifyContent:'flex-end',
                    }}
                    source={music} resizeMode="cover" st>
                    <Text style={{
                        color: '#fff',
                        fontSize:hp('3%'),
                        fontWeight: '500',
                        textTransform: 'capitalize',
                        elevation: 4,
                        marginLeft:hp('1%')
                    }}>kabhi to pass mere aao</Text>
                    <Text
                    style={{
                        color: '#fff',
                        fontSize:hp('2%'),
                        fontWeight: '400',
                        textTransform: 'capitalize',
                        marginLeft:hp('1%'),
                        marginBottom:hp('1%')
                    }}
                    >arjit singh</Text>
                    </ImageBackground>
                    </TouchableOpacity>
                    )} />
                    </View>
    )
}

export default MusicList

// {//<View style={{
                    //     borderWidth: 2,
                    //     borderColor: 'green',
                    //     height: 120,
                    //     width: '90%',
                    //     marginVertical: 10,
                    //     borderRadius: 5
                    // }}>

                    //     <Text>{item}</Text>
                    //     </View>
                    // </View>