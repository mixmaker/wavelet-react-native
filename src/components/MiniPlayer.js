import {
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  Pressable,
} from 'react-native';
import React, { useEffect } from 'react';
import TrackPlayer, { useProgress } from 'react-native-track-player';
import { useNavigation } from '@react-navigation/native';
import useAppContext from '../contexts/useAppContext';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Scrubber from 'react-native-scrubber';
import useThemeProvider from '../contexts/useThemeProvider';

const MiniPlayer = () => {
  const navigate2player = useNavigation();
  const { isPlaying, playlist, currentTrackIndex } = useAppContext();
  const { colors, constants } = useThemeProvider();

  // const getCurrentSong = () => {
  //   try {
  //     setCurrentSong(TrackPlayer.getTrack(TrackPlayer.getCurrentTrack()));
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // #363948 #565867
  const progress = useProgress();

  return (
    <Pressable onPress={() => navigate2player.navigate('Player')}>
      {({ pressed }) => (
        <View style={{ paddingHorizontal: 5, opacity: pressed ? 0.7 : 1 }}>
          {playlist.length > 0 && (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              {/* <View style={{position:'absolute', top:-10, width:'100%'}}>
                <Scrubber
                  totalDuration={progress.duration}
                  value={progress.position}
                  bufferedValue={progress.buffered}
                  trackColor={colors.primaryText}
                  scrubbedColor="#dfdfdf"
                  displayValues={false}
                  // trackBackgroundColor={isDarkMode ? '#4e4e4e' : '#fff'}
                  onSlidingComplete={s => {
                    TrackPlayer.seekTo(s);
                  }}
                />
              </View> */}
              <View
                style={{
                  width: '80%',
                  overflow: 'hidden',
                  height: 60,
                  flexDirection: 'row',
                  // justifyContent: 'space-around',
                  alignItems: 'center',
                }}>
                <Image
                  source={{
                    uri: playlist[currentTrackIndex]?.artwork?.replace(
                      '150x150',
                      '500x500',
                    ),
                  }}
                  style={{
                    height: 50,
                    width: 50,
                    marginHorizontal: 10,
                    borderRadius: 5,
                  }}
                />
                <View>
                  <Text
                    style={{
                      // ...GlobalStyles.primaryText,
                      // textAlign: 'center',
                      // marginTop: 30,
                      // fontSize: 24,
                      fontWeight: '700',
                      color: colors.primaryText,
                    }}>
                    {playlist[currentTrackIndex]?.title}
                  </Text>
                  <Text
                    style={{
                      color: colors.secondaryText,
                    }}>
                    {playlist[currentTrackIndex]?.artist?.replace(', ', ' ??? ')}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  width: '20%',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-around',
                }}>
                <TouchableWithoutFeedback
                  style={{ marginRight: 10 }}
                  onPress={() => {
                    if (isPlaying === 'playing' || isPlaying === 'buffering') {
                      TrackPlayer.pause();
                    }
                    if (isPlaying === 'paused') {
                      TrackPlayer.play();
                    }
                  }}>
                  <FontAwesome5
                    name={
                      isPlaying === 'playing' || isPlaying === 'buffering'
                        ? 'pause'
                        : 'play'
                    }
                    size={18}
                    color={colors.icon}
                  />
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback
                  style={{ marginLeft: 10 }}
                  onPress={() => TrackPlayer.skipToNext()}>
                  <Ionicons
                    name="play-skip-forward"
                    size={24}
                    color={colors.icon}
                  />
                </TouchableWithoutFeedback>
              </View>
            </View>
          )}
        </View>
      )}
    </Pressable>
  );
};

export default MiniPlayer;
