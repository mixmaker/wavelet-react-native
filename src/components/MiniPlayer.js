import { View, Text, Image, TouchableWithoutFeedback } from 'react-native';
import React, { useEffect } from 'react';
import TrackPlayer, {
  Capability,
  Event,
  State,
  useTrackPlayerEvents,
} from 'react-native-track-player';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import useAppContext from '../contexts/useAppContext';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { BlurView } from '@react-native-community/blur';
import useThemeProvider from '../contexts/useThemeProvider';

const MiniPlayer = () => {
  const navigate2player = useNavigation();
  const { isPlaying, currentSong } = useAppContext();
  const { themeBasedStyles, constants } = useThemeProvider();

  // const getCurrentSong = () => {
  //   try {
  //     setCurrentSong(TrackPlayer.getTrack(TrackPlayer.getCurrentTrack()));
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // #363948 #565867
  return (
    // <BlurView tint='dark' overlayColor=''>
    <TouchableWithoutFeedback
      onPress={() => navigate2player.navigate('Player')}>
      <View style={{ paddingHorizontal: 5 }}>
        {currentSong && (
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
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
                  uri: currentSong.artwork.replace('150x150', '500x500'),
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
                    color: themeBasedStyles.primaryText,
                  }}>
                  {currentSong.title}
                </Text>
                <Text
                  style={{
                    color: themeBasedStyles.secondaryText,
                  }}>
                  {currentSong.artist.replace(', ', ' • ')}
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
                  isPlaying ? TrackPlayer.pause() : TrackPlayer.play();
                }}>
                <FontAwesome5
                  name={isPlaying ? 'pause' : 'play'}
                  size={18}
                  color={themeBasedStyles.icon}
                />
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback
                style={{ marginLeft: 10 }}
                onPress={() => TrackPlayer.skipToNext()}>
                <Ionicons
                  name="play-skip-forward"
                  size={24}
                  color={themeBasedStyles.icon}
                />
              </TouchableWithoutFeedback>
            </View>
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
    // </BlurView>
  );
};

export default MiniPlayer;
