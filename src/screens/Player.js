import {
  View,
  Image,
  ScrollView,
  Pressable,
  Platform,
  ActivityIndicator,
  Button,
} from 'react-native';
import React, { useEffect } from 'react';
import useAppContext from '../contexts/useAppContext';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import TrackPlayer from 'react-native-track-player';
import Scrubber from 'react-native-scrubber';
import useThemeProvider from '../contexts/useThemeProvider';
import LinearGradient from 'react-native-linear-gradient';
import { SheetManager } from 'react-native-actions-sheet';
import CustomText from '../fragments/CustomText';

const Player = ({ route, navigation }) => {
  const {
    isPlaying,
    currentTrackIndex,
    playlist,
    isDarkMode,
    colorPalette,
    lyrics,
    progress,
    audioQuality,
  } = useAppContext();
  const { colors, constants } = useThemeProvider();

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{
        flex: 1,
        backgroundColor: colors.primarybg,
      }}>
      {colorPalette && (
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 0.5, y: 0.35 }}
          colors={[
            Platform.OS === 'android'
              ? colorPalette.average
              : colorPalette.dominant,
            // isDarkMode? colorPalette.darkVibrant: colorPalette.vibrant,
            colors.primarybg,
          ]}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            height: constants.fullHeight,
            width: constants.fullWidth,
            zIndex: -1,
            opacity: 0.8,
          }}
        />
      )}
      {/* <View
        style={{
          marginTop: constants.statusbarHeight + 20,
          marginBottom: 30,
          marginHorizontal: 20,
        }}>
        <Entypo
          name="chevron-small-down"
          size={24}
          color={colors.icon}
          onPress={() => navigation.goBack()}
        />
      </View> */}
      {playlist.length > 0 && (
        <View
          style={{
            marginHorizontal: 20,
            marginTop: constants.statusbarHeight + constants.fullHeight / 10,
            // backgroundColor:'red'
          }}>
          <View>
            <View
              style={{
                borderRadius: 10,
                marginHorizontal: 5,
                // overflow: 'hidden',
                shadowColor: colorPalette.vibrant,
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 330,
                marginTop: 5,
                height: constants.fullWidth - 50,
                backgroundColor: colors.secondarybg,
              }}>
              <Image
                source={{
                  uri: playlist[currentTrackIndex]?.artwork.replace(
                    '150x150',
                    '500x500',
                  ),
                }}
                style={{
                  borderRadius: 10,

                  height: constants.fullWidth - 50,
                }}
              />
            </View>

            <CustomText bold
              numberOfLines={1}
              style={{
                color: colors.primaryText,
                // textAlign: 'center',
                marginTop: 30,
                marginBottom: 7,
                fontSize: 29,
                paddingRight: 40,
              }}>
              {playlist[currentTrackIndex]?.title}
            </CustomText>
            <CustomText
              numberOfLines={1}
              style={{
                // textAlign: 'center',
                color: colors.secondaryText,
                fontSize: 15,
                marginBottom: 20,
                paddingRight: 60,
              }}>
              {playlist[currentTrackIndex]?.artist}
              {/* {songDetails.more_info.artistMap.primary_artists.length > 2
                      ? songDetails.more_info.artistMap.primary_artists
                          .splice(2)
                          .map(artist => artist.name)
                          .join(' • ')
                      : songDetails.more_info.artistMap.primary_artists
                          .map(artist => artist.name)
                          .join(' • ')} */}
            </CustomText>
          </View>
          <View
            style={{
              marginTop: 10,
              width: constants.fullWidth - 40,
              height: 40,
              alignSelf: 'center',
            }}>
            <Scrubber
              totalDuration={progress.duration}
              value={progress.position}
              bufferedValue={progress.buffered}
              trackColor={colorPalette.lightVibrant}
              scrubbedColor="#dfdfdf"
              trackBackgroundColor={isDarkMode ? '#4e4e4e' : '#fff'}
              onSlidingComplete={s => {
                TrackPlayer.seekTo(s);
              }}
            />
          </View>
          <View
            style={{
              marginTop: 20,
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              alignItems: 'center',
            }}>
            <Ionicons
              name="play-back"
              size={26}
              color={colors.icon}
              onPress={() => TrackPlayer.skipToPrevious()}
            />

            <Pressable
              style={({ pressed }) => ({
                zIndex: 0.5,
                padding: 5,
                backgroundColor: colors.secondarybg,
                height: 65,
                width: 65,
                // elevation: 5,
                borderRadius: 65 / 2,
                alignItems: 'center',
                justifyContent: 'center',
                transform: [{ scale: pressed ? 0.94 : 1 }],
              })}
              onPress={() => {
                if (isPlaying === 'playing' || isPlaying === 'buffering') {
                  TrackPlayer.pause();
                }
                if (isPlaying === 'paused') {
                  TrackPlayer.play();
                }
              }}>
              <View
                style={
                  {
                    // paddingRight: isPlaying? 0 : 0.5
                  }
                }>
                {isPlaying === 'buffering' && (
                  <ActivityIndicator
                    size="large"
                    color={
                      colorPalette.lightVibrant === '#000000'
                        ? '#fff'
                        : colorPalette.lightVibrant
                    }
                    style={{
                      position: 'absolute',
                      transform: [{ scale: 2 }],
                    }}
                  />
                )}
                {isPlaying === 'playing' || isPlaying === 'buffering' ? (
                  <AntDesign size={30} name="pause" color={colors.icon} />
                ) : (
                  <Entypo
                    size={30}
                    name="controller-play"
                    color={colors.icon}
                  />
                )}
              </View>
            </Pressable>
            <Ionicons
              name="play-forward"
              size={26}
              color={colors.icon}
              onPress={() => TrackPlayer.skipToNext()}
            />
          </View>
          <View
            style={{
              marginTop: 20,
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
            <MaterialIcons
              name="multitrack-audio"
              size={20}
              color={colors.icon}
            />
            <CustomText
              style={{
                color: colors.secondaryText,
              }}>
              Audio Quality:{' '}
              {audioQuality === 320
                ? 'High'
                : audioQuality === 160
                ? 'Normal'
                : audioQuality === 96
                ? 'Basic'
                : 'Low'}
            </CustomText>
          </View>
          <View
            style={{
              alignItems: 'center',
              marginTop: 20,
            }}>
            <Pressable
              style={{ alignItems: 'center' }}
              onPress={() => {
                SheetManager.show('now-playing-sheet');
              }}>
              <CustomText bold
                style={{
                  textAlign: 'center',
                  fontSize: 18,
                }}>
                Up Next
              </CustomText>
              <Entypo name="chevron-down" size={20} />
            </Pressable>
          </View>
        </View>
      )}
    </ScrollView>
  );
};
export default Player;
