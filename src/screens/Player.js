import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  Pressable,
  Platform,
  ActivityIndicator,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import useAppContext from '../contexts/useAppContext';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import TrackPlayer, { useProgress } from 'react-native-track-player';
import Scrubber from 'react-native-scrubber';
import useThemeProvider from '../contexts/useThemeProvider';
import LinearGradient from 'react-native-linear-gradient';
import HTMLView from 'react-native-htmlview';

const Player = ({ route, navigation }) => {
  const {
    isPlaying,
    currentTrackIndex,
    playlist,
    isDarkMode,
    colorPalette,
    lyrics,
    decodeHtml,
  } = useAppContext();
  const { colors, constants } = useThemeProvider();
  const progress = useProgress();

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
          end={{ x: 0, y: 0.75 }}
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
          }}
        />
      )}
      <View
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
      </View>
      {playlist.length > 0 && (
        <View style={{ marginHorizontal: 20 }}>
          <View>
            <View
              style={{
                borderRadius: 10,
                marginHorizontal: 5,
                overflow: 'hidden',
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 8,
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
                  height: constants.fullWidth - 50,
                }}
              />
            </View>

            <Text
              style={{
                color: colors.primaryText,
                textAlign: 'center',
                marginTop: 20,
                fontSize: 24,
                fontWeight: '700',
              }}>
              {decodeHtml(playlist[currentTrackIndex]?.title)}
            </Text>
            <Text
              style={{ textAlign: 'center', fontSize: 16, marginBottom: 10 }}>
              {playlist[currentTrackIndex]?.artist}
              {/* {songDetails.more_info.artistMap.primary_artists.length > 2
                      ? songDetails.more_info.artistMap.primary_artists
                          .splice(2)
                          .map(artist => artist.name)
                          .join(' • ')
                      : songDetails.more_info.artistMap.primary_artists
                          .map(artist => artist.name)
                          .join(' • ')} */}
            </Text>
          </View>
          <View
            style={{
              width: constants.fullWidth - 60,
              height: 40,
              alignSelf: 'center',
            }}>
            <Scrubber
              totalDuration={progress.duration}
              value={progress.position}
              bufferedValue={progress.buffered}
              trackColor={colors.primaryText}
              scrubbedColor="#dfdfdf"
              trackBackgroundColor={isDarkMode ? '#4e4e4e' : '#fff'}
              onSlidingComplete={s => {
                TrackPlayer.seekTo(s);
              }}
            />
          </View>
          <View
            style={{
              marginTop: 10,
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              alignItems: 'center',
            }}>
            <Ionicons
              name="play-skip-back"
              size={24}
              color={colors.icon}
              onPress={() => TrackPlayer.skipToPrevious()}
            />

            <Pressable
              onPress={() => {
                if (isPlaying === 'playing' || isPlaying === 'buffering') {
                  TrackPlayer.pause();
                }
                if (isPlaying === 'paused') {
                  TrackPlayer.play();
                }
              }}>
              {({ pressed }) => (
                <View
                  style={{
                    height: 50,
                    width: 50,
                    backgroundColor: colors.secondarybg,
                    elevation: 5,
                    padding: 5,
                    borderRadius: 50 / 2,
                    alignItems: 'center',
                    justifyContent: 'center',
                    transform: [{ scale: pressed ? 0.94 : 1 }],
                    // paddingRight: isPlaying? 0 : 0.5
                  }}>
                  {isPlaying === 'buffering' && (
                    <ActivityIndicator
                      size="large"
                      color={colors.primaryText}
                      style={{
                        position: 'absolute',
                        transform: [{ scale: 1.6 }],
                      }}
                    />
                  )}
                  <FontAwesome5
                    name={
                      isPlaying === 'playing' || isPlaying === 'buffering'
                        ? 'pause'
                        : 'play'
                    }
                    size={24}
                    color={colors.icon}
                  />
                </View>
              )}
            </Pressable>
            <Ionicons
              name="play-skip-forward"
              size={24}
              color={colors.icon}
              onPress={() => TrackPlayer.skipToNext()}
            />
          </View>
          <View
            style={{
              marginTop: 25,
              flexDirection: 'row',
              justifyContent: 'space-around',
            }}>
            <MaterialCommunityIcons
              name="heart-outline"
              size={24}
              color={colors.icon}
            />
            <Ionicons name="md-shuffle" size={24} color={colors.icon} />
            {/* <MaterialCommunityIcons name="heart" size={24} color={colors.icon} /> */}
            <MaterialCommunityIcons
              name="repeat-off"
              size={24}
              color={colors.icon}
            />
            <MaterialCommunityIcons
              name="download"
              size={24}
              color={colors.icon}
            />
            {/* <MaterialCommunityIcons name="repeat" size={24} color={colors.icon} />
        <MaterialCommunityIcons name="repeat-once" size={24} color={colors.icon} /> */}
          </View>
          <View
            style={{
              marginTop: 40,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <MaterialIcons
              name="multitrack-audio"
              size={20}
              color={colors.icon}
            />
            <Text
              style={{
                color: colors.secondaryText,
              }}>
              Audio Quality: {'High'}
            </Text>
          </View>
        </View>
      )}
      <View
        style={{
          flex: 1,
          marginTop: 20,
          marginHorizontal: 20,
          padding: 10,
          borderRadius: 12,
          backgroundColor: '#191919',
          // height: 600, //! why flex 1 isn't working, why i need a fixed height
        }}>
        <Text
          style={{
            color: colors.primaryText,
            fontSize: 18,
            fontWeight: '700',
          }}>
          Lyrics:
        </Text>
        {lyrics && (
          <HTMLView
            addLineBreaks={false}
            style={{ height: 400 }}
            value={
              lyrics.lyrics
                ? lyrics.lyrics
                : lyrics.error
                ? lyrics.error.msg
                : '<p>Lyrics not available</p>'
            }
            // value="<p>
            // Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum nec maximus nulla. Suspendisse potenti. Integer sed enim placerat, fermentum neque sed, euismod augue. Vestibulum sto. Nam auctor justo mi, quis auctor mi molestie eu.Donec laoreet massa ac orci rutrum, in maximus arcu scelerisque. Donec dui  blandit. Morbi orci mauris, accumsan et venenatis at, suscipit sed orci.<br>Suspendisse potenti. Aenean vitae lobortis lectus. Proin non arcu quis metus tempor laoreet. Sed sed leo laoreet, tristique justo sit amet, convallis est. Ut viverra metus non efficitur condimentum. Cras id r volutpat. Vestibulum efficitur iaculis euismod.
            // </p>"
          />
        )}
      </View>
    </ScrollView>
  );
};
export default Player;
