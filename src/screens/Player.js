import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';
import React from 'react';
import useAppContext from '../contexts/useAppContext';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import TrackPlayer, {useProgress} from 'react-native-track-player';
import Scrubber from 'react-native-scrubber';
import useThemeProvider from '../contexts/useThemeProvider';

const Player = ({route, navigation}) => {
  const {isPlaying, currentSong, isDarkMode} = useAppContext();
  const {themeBasedStyles, constants} = useThemeProvider();
  const progress = useProgress();
  
  return (
    <ScrollView
      style={{
        flex: 1,
        paddingTop: 20,
        backgroundColor: themeBasedStyles.primarybg,
      }}>
      <View style={{marginBottom: 30, marginHorizontal: 20}}>
        <Entypo
          name="chevron-small-down"
          size={24}
          color={themeBasedStyles.icon}
          onPress={() => navigation.goBack()}
        />
      </View>
      {currentSong && (
        <View style={{marginHorizontal: 20}}>
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
                marginTop: 10,
                height: constants.fullWidth - 50,
              }}>
              <Image
                source={{
                  uri: currentSong.artwork.replace('150x150', '500x500'),
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
              {currentSong.title}
            </Text>
            <Text style={{textAlign: 'center', fontSize: 16, marginBottom: 10}}>
              {currentSong.artist}
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

            <TouchableWithoutFeedback
              onPress={() => {
                isPlaying ? TrackPlayer.pause() : TrackPlayer.play();
              }}>
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
                  // paddingRight: isPlaying? 0 : 0.5
                }}>
                <FontAwesome5
                  name={isPlaying ? 'pause' : 'play'}
                  size={24}
                  color={themeBasedStyles.icon}
                />
              </View>
            </TouchableWithoutFeedback>
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
            <Ionicons
              name="md-shuffle"
              size={24}
              color={themeBasedStyles.icon}
            />
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
      )}
      <View
        style={{
          marginTop: 20,
          marginHorizontal: 20,
          padding: 10,
          borderRadius: 12,
          backgroundColor: '#191919',
          minHeight: 200,
        }}>
        <Text
          style={{
            color: themeBasedStyles.primaryText,
            fontSize: 18,
            fontWeight: '700',
          }}>
          Lyrics:
        </Text>
      </View>
    </ScrollView>
  );
};

export default Player;
