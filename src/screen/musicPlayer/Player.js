import {
    View,
    Text,
    TouchableOpacity,
    Image
} from 'react-native'
import React from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { colorNew } from '../../modal/color';
import music from '../../assete/music.jpg'
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import AntDesign from 'react-native-vector-icons/AntDesign';


const Player = () => {
    return (
        <View>
            <View style={{ marginTop: hp('6%') }}>
                <Text style={{
                    textTransform: 'uppercase',
                    fontSize: hp('4%'),
                    fontWeight: 900,
                    color: colorNew.font,
                    marginLeft: hp('4%')
                }}>
                    dusk till down
                </Text>
                <Text style={{
                    textTransform: 'capitalize',
                    fontSize: hp('2.5%'),
                    fontWeight: 500,
                    color: colorNew.font,
                    marginLeft: hp('4%')
                }}>
                    zayan ft. sia
                </Text>
            </View>
            <View style={{
                height: 500,
                flexDirection: 'row',
                alignItems: 'center'

            }}>
                <View style={{
                    width: '45%',
                    height: hp('30%'),
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <View
                        style={{
                            borderWidth: hp('0.6%'),
                            borderColor: '#fff',
                            height: hp('55%'),
                            backgroundColor: colorNew.theme,
                            width: hp('8%'),
                            alignSelf: 'center',
                            borderRadius: hp('60%'),
                            justifyContent:'space-evenly',
                            alignItems:'center',
                            elevation:20
                        }}>
                        <TouchableOpacity>
                        <AntDesign name="retweet" size={30} color="#fff" />
                        </TouchableOpacity>

                        <TouchableOpacity>
                        <AntDesign name="stepforward" size={30} color="#fff" />
                        </TouchableOpacity>

                        <TouchableOpacity>
                        <AntDesign name="caretright" size={30} color="#fff" />
                        </TouchableOpacity>

                        <TouchableOpacity>
                        <AntDesign name="stepbackward" size={30} color="#fff" />
                        </TouchableOpacity>
                    </View>
                </View>
                <View
                    style={{
                        borderWidth: hp('0.6%'),
                        height: hp('55%'),
                        width: '70%',
                        borderTopLeftRadius: hp('60%'),
                        borderBottomStartRadius: hp('60%'),
                        borderColor: '#fff',
                        flexDirection: 'row',
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                        shadowColor: '#fff',
                        shadowOpacity: 0.26,
                        shadowOffset: { width: 0, height: 50 },
                        shadowRadius: 10,
                        elevation: 20,

                    }}>
                    <View style={{
                        position: 'absolute',
                        top: hp('2.5%'),
                        left: hp('1.5%'),
                        width: hp('50%'),
                        borderRadius: hp('50%'),
                        height: hp('49%')
                    }}>
                        <AnimatedCircularProgress
                            rotation={-0 - 90}
                            style={{
                                transform: [{ scaleX: -1 }],
                            }}
                            size={369}
                            width={5}
                            fill={55}
                            tintColor="red"
                            // onFillChange={()=>console.log('sdfffdsfdsfds')}
                            // onAnimationComplete={() => console.log('onAnimationComplete')}
                            backgroundColor="transparent" />
                    </View>
                    <View style={{
                        borderWidth: hp('0.6%'),
                        height: hp('42%'),
                        width: hp('26%'),
                        borderTopLeftRadius: hp('60%'),
                        borderBottomStartRadius: hp('60%'),
                        borderColor: '#fff',
                        overflow: 'hidden',
                        shadowColor: 'black',
                        shadowOpacity: 0.8,
                        shadowOffset: { width: 3, height: 50 },
                        shadowRadius: 10,
                        elevation: 20,
                    }}>
                        <Image
                            style={{
                                height: '100%',
                                aspectRatio: 4 / 3
                            }}
                            source={music}
                        />
                    </View>
                </View>
            </View>
            <View style={{
                flexDirection: 'column',
                alignItems: 'center'
            }}>
                <View style={{
                    justifyContent: 'center',
                    flexDirection: 'row'
                }}>
                    <Text
                        style={{
                            color: colorNew.font,
                            fontWeight: '500',
                            fontSize: hp('3%'),
                            marginRight: 3
                        }}
                    >But you'll</Text>
                    <Text style={{
                        color: colorNew.textcolor,
                        fontWeight: '500',
                        fontSize: hp('3%')
                    }}>never be alone</Text>
                </View>
                <TouchableOpacity style={{
                    borderRadius: hp('10%'),
                    borderWidth: hp('0.5%'),
                    padding: hp('1.5%'),
                    marginTop: hp('2%'),
                    borderColor: '#fff',
                    elevation: 10,
                    backgroundColor: colorNew.theme
                }}>
                    <Text style={{
                        color: colorNew.font,
                        fontWeight: '700',
                        textTransform: 'capitalize',
                        elevation: 4
                    }}>see all lyrics</Text>
                </TouchableOpacity>
                <View>
                </View>

            </View>
        </View>
    )
}

export default Player
