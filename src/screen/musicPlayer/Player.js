import {
    View,
    Text,
    TouchableOpacity,
    Image,
    Animated,
    Easing,
    PermissionsAndroid
} from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { colorNew } from '../../modal/color';
import mu from '../../assete/music.jpg';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
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

const togglePlayBack = async playBackState => {
    const currentTrack = await TrackPlayer.getCurrentTrack();
    console.log(playBackState, State.Paused);
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
    const [urldata, setUrldata] = useState('');
    const [trackduration, setTrackDuration] = useState('');
    const progress = useProgress();
    const Sheet = useRef(null);
    const spinValue = new Animated.Value(0);

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
        MusicFiles.getAll({
            id: true,
            album: true,
            blured: false,
            artist: true,
            duration: true, //default : true
            cover: true, //default : true,
            title: true,
            cover: true,
            coverFolder: '/storage/download/',
            coverResizeRatio: 1,
            coverSize: 250,
            icon: true,
            iconSize: 250
        })
            .then(async res => {
                const tracks = res.results
                var list = await tracks.map(item => item);
                const ab = [];
                for (var i = 0; i < list.length; i++) {
                    const urlget = {
                        url: list[i].path,
                        title: list[i].title,
                        author: list[i].artist,
                        artwork:list[i].cover,
                        duration:
                            Math.floor(list[i].duration / 60000) + ':' +
                            (((list[i].duration % 60000) / 1000).toFixed(0) < 10 ? '0' : '') +
                            ((list[i].duration % 60000) / 1000).toFixed(0),
                    };
                    const ttt = ab.push(urlget);
                }
                setMusic(ab);
            })
            .catch(error => {
                console.log(error);
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
                    Capability.SeekTo,
                ],
                compactCapabilities: [Capability.Play],
            });
            await TrackPlayer.add(music);
        } catch (error) {
            console.log(error);
        }
    };
    useTrackPlayerEvents([Event.PlaybackTrackChanged], async event => {
        if (event.type === Event.PlaybackTrackChanged && event.nextTrack !== null) {
            if (event.nextTrack == null) {
                await TrackPlayer.stop();
            } else {
                const track = await TrackPlayer.getTrack(event.nextTrack);
                const { title, author, duration ,url} = track;
                setTrackTitle(title);
                setTrackArtist(author);
                setTrackDuration(duration);
                setUrldata(url);
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
            duration: 1550,
            easing: Easing.linear,
            useNativeDriver: true,
        }).start();
    }, [progress.position]);

    useEffect(() => {
        if (isMounted.current) {
            if (music.length > 0) { setupPlayer(); console.log('pass') }
            else { console.log('fail') }
        } else {
            isMounted.current = true
        }
    }, [music])

    return (
        <View style={{ flex: 1, backgroundColor: colorNew.theme }}>
            <View style={{ marginTop: hp('6%') }}>
                <Text style={{
                    textTransform: 'uppercase',
                    fontSize: hp('4%'),
                    fontWeight: 900,
                    color: colorNew.font,
                    marginLeft: hp('4%')
                }}>
                    {trackTitle ? trackTitle.substring(0, 17) : null}
                </Text>
                <Text style={{
                    textTransform: 'capitalize',
                    fontSize: hp('2.5%'),
                    fontWeight: 500,
                    color: colorNew.font,
                    marginLeft: hp('4%')
                }}>
                    {trackArtist ? trackArtist.substring(0, 10) : '*****'}
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
                            justifyContent: 'space-evenly',
                            alignItems: 'center',
                            elevation: 20
                        }}>
                        <TouchableOpacity onPress={changeRepeatMode}>
                            <MaterialCommunityIcons name={`${repeatIcon()}`}
                                size={30}
                                color={RepeatMode !== 'off' ? '#fff' : '#fff'} />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={skipToNext}>
                            <AntDesign name="stepforward" size={30} color="#fff" />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => { togglePlayBack(playBackState) }}>
                            <AntDesign name={
                                playBackState === State.Playing
                                    ? 'pause'
                                    : 'caretright'
                            } size={30} color="#fff" />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={skipToPrevious}>
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
                            size={375}
                            width={6}
                            fill={progress.position / progress.duration * 100}
                            tintColor="red"
                            // onFillChange={()=>console.log('sdfffdsfdsfds')}
                            // onAnimationComplete={() => console.log('onAnimationComplete')}
                            backgroundColor="transparent" />
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
                            shadowColor: 'black',
                            shadowOpacity: 0.8,
                            shadowOffset: { width: 3, height: 50 },
                            shadowRadius: 10,
                            elevation: 20,
                        }}>
                        <CoverImage
                            source={urldata}
                            style={{
                                height: '100%', width: 290, resizeMode: 'cover',
                                // transform: [{ rotate: spin }],
                            }}
                        />
                        {/* <Animated.Image
                            style={{
                                height:'100%',width:290,resizeMode:'cover',
                                transform: [{ rotate: spin }],
                            }}  /> */}
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
                    }}>see all songs</Text>
                </TouchableOpacity>
                <View>
                </View>

            </View>
        </View>
    )
}

export default Player
