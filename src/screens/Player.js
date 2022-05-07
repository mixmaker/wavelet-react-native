import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableWithoutFeedback,
  Pressable,
  StatusBar,
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
import RenderHtml from 'react-native-render-html';

const Player = ({ route, navigation }) => {
  const {
    isPlaying,
    currentSong,
    isDarkMode,
    colorPalette,
    lyrics,
    decodeHtml,
  } = useAppContext();
  const { themeBasedStyles, constants } = useThemeProvider();
  const progress = useProgress();

  const r = {
    average: '#332644',
    darkMuted: '#685080',
    darkVibrant: '#080840',
    dominant: '#080840',
    lightMuted: '#A08888',
    lightVibrant: '#68A8F0',
    muted: '#5060B0',
    platform: 'android',
    vibrant: '#2848D8',
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{
        flex: 1,
        backgroundColor: themeBasedStyles.primarybg,
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
            themeBasedStyles.primarybg,
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
          marginTop: StatusBar.currentHeight + 20,
          marginBottom: 30,
          marginHorizontal: 20,
        }}>
        <Entypo
          name="chevron-small-down"
          size={24}
          color={themeBasedStyles.icon}
          onPress={() => navigation.goBack()}
        />
      </View>
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
              backgroundColor: themeBasedStyles.secondarybg,
            }}>
            <Image
              source={{
                uri: currentSong?.artwork.replace('150x150', '500x500'),
              }}
              style={{
                height: constants.fullWidth - 50,
              }}
            />
          </View>

          <Text
            style={{
              color: themeBasedStyles.primaryText,
              textAlign: 'center',
              marginTop: 20,
              fontSize: 24,
              fontWeight: '700',
            }}>
            {decodeHtml(currentSong?.title)}
          </Text>
          <Text style={{ textAlign: 'center', fontSize: 16, marginBottom: 10 }}>
            {currentSong?.artist}
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
            trackColor={themeBasedStyles.primaryText}
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
            color={themeBasedStyles.icon}
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
            {({pressed}) => (
              <View
                style={{
                  height: 50,
                  width: 50,
                  backgroundColor: themeBasedStyles.secondarybg,
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
                    color={themeBasedStyles.primaryText}
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
                  color={themeBasedStyles.icon}
                />
              </View>
            )}
          </Pressable>
          <Ionicons
            name="play-skip-forward"
            size={24}
            color={themeBasedStyles.icon}
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
            color={themeBasedStyles.icon}
          />
          <Ionicons name="md-shuffle" size={24} color={themeBasedStyles.icon} />
          {/* <MaterialCommunityIcons name="heart" size={24} color={themeBasedStyles.icon} /> */}
          <MaterialCommunityIcons
            name="repeat-off"
            size={24}
            color={themeBasedStyles.icon}
          />
          <MaterialCommunityIcons
            name="download"
            size={24}
            color={themeBasedStyles.icon}
          />
          {/* <MaterialCommunityIcons name="repeat" size={24} color={themeBasedStyles.icon} />
        <MaterialCommunityIcons name="repeat-once" size={24} color={themeBasedStyles.icon} /> */}
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
            color={themeBasedStyles.icon}
          />
          <Text
            style={{
              color: themeBasedStyles.secondaryText,
            }}>
            Audio Quality: {'High'}
          </Text>
        </View>
      </View>
      <View
        style={{
          flex: 1,
          marginTop: 20,
          marginHorizontal: 20,
          padding: 10,
          borderRadius: 12,
          backgroundColor: '#191919',
          height: 600, //! why flex 1 isn't working, why i need a fixed height
        }}>
        <Text
          style={{
            color: themeBasedStyles.primaryText,
            fontSize: 18,
            fontWeight: '700',
          }}>
          Lyrics:
        </Text>
        {lyrics && (
          <RenderHtml
            source={{
              html: lyrics.lyrics
                ? lyrics.lyrics
                : '<p>Lyrics not available</p>',
            }}
            contentWidth={constants.fullWidth - 40}
          />
        )}
      </View>
    </ScrollView>
  );
};
export default Player;
