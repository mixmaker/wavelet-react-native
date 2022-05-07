import { View, Text, Image, Pressable } from 'react-native';
import React from 'react';
import useAppContext from '../contexts/useAppContext';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import useThemeProvider from '../contexts/useThemeProvider';
import { fetchSongDataFromId } from '../api';
import axios from 'axios';

const CardSmall = ({ song }) => {
  const { setCurrentSongId, decodeHtml, playlist, setPlaylist } =
    useAppContext();
  const { themeBasedStyles } = useThemeProvider();
  const cancelTokenSource = axios.CancelToken.source();

  const addToPlaylist = async songId => {
    if (playlist.length < 1) {
      return setCurrentSongId(songId);
    }
    const track = await fetchSongDataFromId(songId, cancelTokenSource);
    setPlaylist(prevPlaylist => [...prevPlaylist, track]);
  };
  return (
    <Pressable
      activeOpacity={0.5}
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
      onPress={() => {
        setCurrentSongId(song?.id);
      }}>
      {({ pressed }) => (
        <View
          style={{
            flexDirection: 'row',
            transform: [{ scale: pressed ? 0.99 : 1 }],
            opacity: pressed ? 0.5 : 1,
            alignItems: 'center',
            marginVertical: 10,
            flex: 1,
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              flex: 0.8,
              flexDirection: 'row',
            }}>
            <View
              style={{
                backgroundColor: '#f2f2f2',
                marginRight: 15,
                shadowColor: '#000',
                borderRadius: 10,
                overflow: 'hidden',
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 8,
                height: 50,
                width: 50,
              }}>
              <Image
                source={{ uri: song?.image }}
                style={{
                  height: '100%',
                  width: '100%',
                }}
              />
            </View>
            <View>
              <Text
                numberOfLines={2}
                style={{
                  color: themeBasedStyles.primaryText,
                  fontSize: 16,
                }}>
                {decodeHtml(song?.title)}
              </Text>
              <Text
                numberOfLines={2}
                style={{
                  color: themeBasedStyles.secondaryText,
                }}>
                {song?.more_info.artistMap.primary_artists.length > 2
                  ? song?.more_info.artistMap.primary_artists
                      .slice(0, 2)
                      .map(artist => decodeHtml(artist.name))
                      .join(', ')
                  : song?.more_info.artistMap.primary_artists
                      .map(artist => decodeHtml(artist.name))
                      .join(', ')}
              </Text>
            </View>
          </View>
          <Pressable
            style={({ pressed }) => ({
              backgroundColor: pressed ? '#444' : 'transparent',
            })}
            onPress={() => {
              addToPlaylist(song?.id);
            }}>
            {({ pressed }) => (
              <MaterialCommunityIcons
                name="playlist-plus"
                size={24}
                color={themeBasedStyles.icon}
                style={{ transform: [{ scale: pressed ? 0.9 : 1 }] }}
              />
            )}
          </Pressable>
        </View>
      )}
    </Pressable>
  );
};

export default CardSmall;
