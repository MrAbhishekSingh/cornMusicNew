import {
    View,
    Text,
    FlatList,
    ImageBackground,
    Image,
    TouchableOpacity,
    PermissionsAndroid,
    StyleSheet
} from 'react-native'
import React, { useEffect, useState } from 'react'
import { colorNew } from '../../modal/color'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import music from '../../assete/music.jpg'
import MusicFiles, {
    Constants,
    CoverImage
} from "react-native-get-music-files-v3dev-test";
import TrackPlayer, {
    Capability,
    Event,
    RepeatMode,
    State,
    usePlaybackState,
    useProgress,
    useTrackPlayerEvents,
} from 'react-native-track-player';
import { InterstitialAd, BannerAd, TestIds, BannerAdSize, AdEventType } from 'react-native-google-mobile-ads';


const MusicList = () => {
    const [songs, setSongs] = useState('');


    const adUnitId = __DEV__ ? 'ca-app-pub-5136668440114711/6398570319' :
        'ca-app-pub-5136668440114711/6398570319';

    const adUnitIdd = __DEV__ ? 'ca-app-pub-5136668440114711/2925943751' :
        'ca-app-pub-5136668440114711/2925943751'

    const onClick = async () => {
        try {
            const granted = await PermissionsAndroid.requestMultiple(
                [
                    PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
                    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                ],
                {
                    title: 'Permission',
                    message: 'Storage access is requiered',
                    buttonPositive: 'OK',
                },
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                alert('You can use the package');
            } else {
                // console.log('again');
            }
        } catch (err) {
            // console.warn(err);
        }
        // console.log('click');
        MusicFiles.getAll({
            id: true,
            album: true,
            blured: false,
            artist: true,
            duration: true, //default : true
            cover: true, //default : true,
            title: true,
            cover: true,
            coverFolder: '/storage/emulated/0/Download/Covers',
            coverResizeRatio: 1,
            coverSize: 250,
            icon: true,
            iconSize: 250,
            fields: ['title', 'albumTitle', 'genre', 'lyrics', 'artwork', 'duration']
        })
            .then(async tracks => {
                setSongs(tracks.results)
                // console.log(tracks);
                // var list = await tracks.map(item => item);
                // const ab = [];
                // for (var i = 0; i < list.length; i++) {
                //     const urlget = {
                //         url: list[i].path,
                //         title: list[i].title,
                //         author: list[i].author,
                //         duration:
                //             Math.floor(list[i].duration / 60000) +
                //             ':' +
                //             (((list[i].duration % 60000) / 1000).toFixed(0) < 10 ? '0' : '') +
                //             ((list[i].duration % 60000) / 1000).toFixed(0),
                //     };
                //     const ttt = ab.push(urlget);
                // }
                // console.log('ab', ab)
                // setMusic(ab);
            })
            .catch(error => {
                // console.log(error);
            });
    };
    useEffect(() => {
        onClick()
    }, [])

    // console.log('songs', songs);

    const skipTo = async index => {
        await TrackPlayer.skip(index);
        await TrackPlayer.play();
    };

    const styles = StyleSheet.create({
        container: {
            paddingTop: 50,
        },
        tinyLogo: {
            width: '100%',
            aspectRatio: 4 / 3,
        },
        logo: {
            width: 66,
            height: 58,
        },
    });

    return (
        <View style={{
            flex: 1,
            backgroundColor: colorNew.theme,
            paddingHorizontal: hp('3%')
        }}>
            <FlatList
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                data={songs}
                keyExtractor={(item, index) => String(index)}
                renderItem={({ index, item }) => (
                    <>


                        <TouchableOpacity onPress={() => skipTo(index)} style={{ elevation: 10 }}>
                            <ImageBackground
                                style={{
                                    borderWidth: hp('0.4%'),
                                    borderColor: '#fff',
                                    aspectRatio: 4 / 4,
                                    width: '100%',
                                    marginVertical: 10,
                                    borderRadius: 8,
                                    overflow: 'hidden',
                                    display: 'flex',
                                }}
                                source={music} resizeMode="cover">
                                <View style={{
                                    position: 'absolute',
                                    left: 0,
                                    bottom: 0,
                                    zIndex: 200,
                                    backgroundColor: '#fff',
                                    width: '100%',
                                    elevation: 10,
                                    opacity: 0.9,
                                }}>
                                    <Text style={{
                                        textShadowColor: 'gray',
                                        textShadowOffset: { width: -1, height: 0 },
                                        textShadowRadius: 10,
                                        color: '#000',
                                        fontFamily: 'tahoma',
                                        fontSize: hp('3%'),
                                        fontWeight: '700',
                                        textTransform: 'capitalize',
                                        elevation: 4,
                                        marginLeft: hp('1%')
                                    }}>{item.title ? item.title.substring(0, 20) + '...' : null}</Text>
                                    <Text
                                        style={{
                                            color: 'gray',
                                            fontSize: hp('2%'),
                                            fontWeight: '700',
                                            textTransform: 'capitalize',
                                            marginLeft: hp('1%'),
                                            marginBottom: hp('1%'),
                                            textTransform: 'uppercase'
                                        }}
                                    >{item.artist ? item.artist.substring(0, 18) : null}</Text>
                                </View>
                                {item.cover ?
                                    <CoverImage
                                        source={
                                            item.path
                                        }
                                        style={{ aspectRatio: 4 / 4 }}
                                    /> : null}
                            </ImageBackground>
                        </TouchableOpacity>
                        <View style={{}}>
                            <BannerAd
                                unitId={adUnitId}
                                size={BannerAdSize.BANNER}
                                requestOptions={{
                                    requestNonPersonalizedAdsOnly: true,
                                }}
                            />
                        </View>
                    </>
                )} />
        </View>
    )
}

export default MusicList
