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


const MusicList = () => {
    const [songs, setSongs] = useState('');

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
                console.log('again');
            }
        } catch (err) {
            console.warn(err);
        }
        console.log('click');
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
                console.log(error);
            });
    };
    useEffect(() => {
        onClick()
    }, [])

    // console.log('songs', songs);

    const skipTo = async index => {
        await TrackPlayer.skip(index);
        await TrackPlayer.play();
        console.log(index);
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
                                    height: hp('30%'),
                                    width: '100%',
                                    marginVertical: 10,
                                    borderRadius: 8,
                                    overflow: 'hidden',
                                    // justifyContent: 'flex-end',
                                    display: 'flex',
                                    // flexDirection: 'column'
                                }}
                                source={music} resizeMode="cover">
                                <View style={{position:'absolute',left:30,bottom:30, zIndex: 200}}>
                                    <Text style={{
                                        color: '#fff',
                                        fontSize: hp('3%'),
                                        fontWeight: '500',
                                        textTransform: 'capitalize',
                                        elevation: 4,
                                        marginLeft: hp('1%')
                                    }}>{item.title ? item.title.substring(0, 20) : null}</Text>
                                    <Text
                                        style={{
                                            color: '#fff',
                                            fontSize: hp('2%'),
                                            fontWeight: '400',
                                            textTransform: 'capitalize',
                                            marginLeft: hp('1%'),
                                            marginBottom: hp('1%')
                                        }}
                                    >{item.artist ? item.artist.substring(0, 18) : null}</Text>
                                </View>
                                {item.cover ?
                                    <CoverImage
                                        source={
                                            item.path
                                        }
                                        style={{aspectRatio: 3/2}}
                                        width='100%'
                                        // height='100%'
                                        // resizeMode="contain"
                                    /> : null}
                            </ImageBackground>
                        </TouchableOpacity>
                    </>
                )} />
        </View>
    )
}

export default MusicList
