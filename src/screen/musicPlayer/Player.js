import {
    View,
    Text,
    TouchableOpacity,
    Image,
    Animated,
    Easing,
    PermissionsAndroid,
    ScrollView,
    Platform
} from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { colorNew } from '../../modal/color';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { InterstitialAd, BannerAd, TestIds, BannerAdSize, AdEventType } from 'react-native-google-mobile-ads';
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
import logo from '../../assets/corn.jpg'

const togglePlayBack = async playBackState => {
    const currentTrack = await TrackPlayer.getCurrentTrack();
    // console.log(playBackState, State.Paused);
    if (currentTrack != null) {
        if (playBackState == State.Playing) {
            await TrackPlayer.pause();
        } else {
            await TrackPlayer.play();
        }
    }
};



const Player = ({ navigation }) => {

    const [music, setMusic] = useState();
    const playBackState = usePlaybackState();
    const [repeatMode, setRepeatMode] = useState('off');
    const isMounted = useRef(false);
    const [trackTitle, setTrackTitle] = useState('');
    const [trackArtist, setTrackArtist] = useState('');
    const [urldata, setUrldata] = useState();
    const [cover, setCover] = useState('');
    const [trackduration, setTrackDuration] = useState('');
    const progress = useProgress();
    const Sheet = useRef(null);
    const spinValue = new Animated.Value(0);

    const adUnitId = __DEV__ ? 'ca-app-pub-5136668440114711/6398570319' :
        'ca-app-pub-5136668440114711/6398570319';

    const adUnitIdd = __DEV__ ? 'ca-app-pub-5136668440114711/2925943751' :
        'ca-app-pub-5136668440114711/2925943751'

    const onClick = async () => {
        try {
            const granted = await PermissionsAndroid.requestMultiple(
                Platform.Version >= 33 ?
                    [
                        PermissionsAndroid.PERMISSIONS.READ_MEDIA_AUDIO,
                        PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES
                    ] :
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
            console.warn(err);
        }
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
            .then(async res => {
                const tracks = res.results
                // console.log('tracks', tracks);
                var list = await tracks.map(item => item);

                const ab = [];
                for (var i = 0; i < list.length; i++) {
                    // console.log(list[i].cover);
                    const urlget = {
                        url: list[i].path,
                        title: list[i].title,
                        author: list[i].artist,
                        artwork: list[i].cover,
                        duration:
                            Math.floor(list[i].duration / 60000) + ':' +
                            (((list[i].duration % 60000) / 1000).toFixed(0) < 10 ? '0' : '') +
                            ((list[i].duration % 60000) / 1000).toFixed(0),
                    };
                    ab.push(urlget);
                }
                setMusic(ab);
            })
            .catch(error => {
                // console.log(error);
            });
    };
    const setupPlayer = async () => {
        try {
            await TrackPlayer.setupPlayer({});
            await TrackPlayer.updateOptions({
                stoppingAppPausesPlayback: true,
                capabilities: [
                    Capability.Play,
                    Capability.Pause,
                    Capability.SkipToNext,
                    Capability.SkipToPrevious,
                    Capability.Skip,
                ],
                compactCapabilities: [
                    Capability.Play,
                    Capability.Pause,
                    Capability.SkipToNext,
                    Capability.SkipToPrevious,
                    Capability.Skip,
                ],
                // progressUpdateEventInterval: 2,
            });
            await TrackPlayer.add(music);
        } catch (error) {
            // console.log(error);
        }
    };

    useTrackPlayerEvents([Event.PlaybackTrackChanged], async event => {
        if (event.type === Event.PlaybackTrackChanged && event.nextTrack !== null) {
            if (event.nextTrack == null) {
                await TrackPlayer.stop();
            } else {
                const track = await TrackPlayer.getTrack(event.nextTrack);
                const { title, author, duration, url, artwork } = track;
                setTrackTitle(title);
                setTrackArtist(author);
                setTrackDuration(duration);
                setUrldata(url);
                setCover(artwork)
            }
        }
    });

    const changeRepeatMode = () => {
        if (repeatMode == 'off') {
            TrackPlayer.setRepeatMode(RepeatMode.Track);
            setRepeatMode('track');
        }

        if (repeatMode == 'track') {
            TrackPlayer.setRepeatMode(RepeatMode.Queue);
            setRepeatMode('repeat');
        }

        if (repeatMode == 'repeat') {
            TrackPlayer.setRepeatMode(RepeatMode.Off);
            setRepeatMode('off');
        }
    };

    const repeatIcon = () => {
        if (repeatMode == 'off') {
            return 'repeat-off';
        }

        if (repeatMode == 'track') {
            return 'repeat-once';
        }

        if (repeatMode == 'repeat') {
            return 'repeat';
        }
    };


    const skipToNext = () => {
        TrackPlayer.skipToNext();
    };
    const skipTo = async index => {
        await TrackPlayer.skip(index);
        await TrackPlayer.play();
    };
    const skipToPrevious = async () => {
        TrackPlayer.skipToPrevious();
        await TrackPlayer.play();
    };
    const spin = spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });
    useEffect(() => {
        onClick();
    }, []);

    useEffect(() => {
        Animated.timing(spinValue, {
            toValue: 1,
            duration: 1600,
            easing: Easing.linear,
            useNativeDriver: true,
        }).start();
    }, [progress.position]);

    useEffect(() => {
        if (isMounted.current) {
            // console.log(music, 'music');
            if (music) { setupPlayer(); console.log('pass') }
            else {
                // console.log('fail')
            }
        } else {
            isMounted.current = true
        }
    }, [music])
    
    const fill = (progress.position / progress.duration) * 100; 
    

    return (
        <ScrollView style={{ flex: 1, backgroundColor: colorNew.theme }}>
            <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
                <BannerAd
                    unitId={adUnitId}
                    size={BannerAdSize.BANNER}
                    requestOptions={{
                        requestNonPersonalizedAdsOnly: true,
                    }}
                />
            </View>
            <View style={{ marginTop: hp('1%') }}>
                <Text style={{
                    fontFamily: 'Cochin',
                    textTransform: 'uppercase',
                    fontSize: hp('4%'),
                    fontWeight: 900,
                    color: colorNew.font,
                    marginLeft: hp('4%'),
                    textShadowColor: 'gray',
                    textShadowOffset: { width: -1, height: 0 },
                    textShadowRadius: 10,
                }}>
                    {trackTitle ? trackTitle.substring(0, 15) + '....' : null}
                </Text>
                <Text style={{
                    textTransform: 'capitalize',
                    fontSize: hp('2.5%'),
                    fontWeight: 500,
                    color: colorNew.font,
                    marginLeft: hp('4%')
                }}>
                    {new Date((progress.duration - progress.position) * 1000).toISOString().substr(14, 5)}&nbsp;
                    <AntDesign name="minus" size={hp('2.5%')} color="#fff" />
                    <AntDesign name="minus" size={hp('2.5%')} color="#fff" />&nbsp;
                    {trackArtist ? trackArtist.substring(0, 11) : 'please wait..'}
                    <AntDesign name="minus" size={hp('2.5%')} color="#fff" />
                    <AntDesign name="minus" size={hp('2.5%')} color="#fff" />&nbsp;
                    {new Date(progress.position * 1000).toISOString().substr(14, 5)}
                </Text>
            </View>
            <View style={{
                height: hp('63%'),
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
                            justifyContent: 'space-evenly',
                            alignItems: 'center',
                            elevation: 10
                        }}>
                        <TouchableOpacity onPress={changeRepeatMode}>
                            <MaterialCommunityIcons name={`${repeatIcon()}`}
                                size={30}
                                color={RepeatMode !== 'off' ? '#fff' : '#fff'} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={skipToPrevious}>
                            <AntDesign name="stepbackward" size={30} color="#fff" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { togglePlayBack(playBackState) }}>
                            <AntDesign name={
                                playBackState === State.Playing
                                    ? 'pause'
                                    : 'caretright'
                            } size={30} color="#fff" />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={skipToNext}>
                            <AntDesign name="stepforward" size={30} color="#fff" />
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
                        shadowRadius: 10,
                        elevation: 25,
                        backgroundColor:colorNew.theme
                    }}>
                    <View style={{
                        position: 'absolute',
                        top: hp('2.5%'),
                        left: hp('1.5%'),
                        width: hp('50%'),
                        borderRadius: hp('50%'),
                        height: hp('49%'),
                    }}>
                        <AnimatedCircularProgress
                            rotation={-360 - 360}
                            style={{
                                transform: [{ scaleX: -1 }],
                            }}
                            arcSweepAngle={180}
                            size={375}
                            width={8}
                            // fill={progress.position / progress.duration * 100}
                            fill={fill}
                            useNativeDriver={false}
                            tintColor="red"
                            onAnimationComplete={() => console.log('onAnimationComplete')}
                            backgroundColor="#fff" />
                    </View>
                    <Animated.View
                        style={{
                            borderWidth: hp('0.6%'),
                            height: hp('42%'),
                            width: hp('26%'),
                            borderTopLeftRadius: hp('60%'),
                            borderBottomStartRadius: hp('60%'),
                            borderColor: '#fff',
                            overflow: 'hidden',
                            shadowColor: '#fff',
                            shadowOpacity: 0.8,
                            shadowOffset: { width: 3, height: 50 },
                            shadowRadius: 10,
                            elevation: 20,

                        }}>
                        <Animated.View style={{ height: '100%', width: 308, transform: [{ rotate: spin }], }}>
                            {cover ?
                                <Image style={{ aspectRatio: 4 / 4 }} source={{ uri: `data:image/png;base64,${cover}` }} /> :
                                <Image style={{ height:320,width:320 }} source={logo} /> 
                            }
                        </Animated.View>

                    </Animated.View>
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
                <TouchableOpacity
                    onPress={() => navigation.navigate('MusicList')}
                    style={{
                        borderRadius: hp('10%'),
                        borderWidth: hp('0.5%'),
                        padding: hp('1.5%'),
                        marginTop: hp('1%'),
                        borderColor: '#fff',
                        elevation: 10,
                        backgroundColor: colorNew.theme
                    }}>
                    <Text style={{
                        color: colorNew.font,
                        fontWeight: '700',
                        textTransform: 'capitalize',
                        elevation: 4
                    }}>see all songs</Text>
                </TouchableOpacity>
                <View>
                </View>

            </View>
            <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: hp('2%'), }}>
                <BannerAd
                    unitId={adUnitId}
                    size={BannerAdSize.BANNER}
                    requestOptions={{
                        requestNonPersonalizedAdsOnly: true,
                    }}
                />
            </View>
        </ScrollView>
    )
}

export default Player
