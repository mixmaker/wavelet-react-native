import { View, Image, Pressable } from 'react-native';
import React from 'react';
import useAppContext from '../contexts/useAppContext';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import useThemeProvider from '../contexts/useThemeProvider';
import { fetchSongDataFromId } from '../api';
import axios from 'axios';
import {
  saveLikedSongs,
  saveRecentlyPlayed,
  unLikeSong,
} from '../data/helpers';
import { SheetManager } from 'react-native-actions-sheet';
import {
  downloadFile,
  requestStoragePermission,
} from '../helpers/downloadhelper';
import CustomText from '../fragments/CustomText';

const CardType1 = ({ song, id, onPress }) => {
  const {
    setCurrentSongId,
    decodeHtml,
    playlist,
    setPlaylist,
    playlistHandler,
    likedSongList,
  } = useAppContext();
  const { colors } = useThemeProvider();
  const cancelTokenSource = axios.CancelToken.source();
  const isLiked = likedSongList.map(id => id).indexOf(id);

  return (
    <Pressable
      activeOpacity={0.5}
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
      onLongPress={() =>
        SheetManager.show('song-info-sheet', { payload: song })
      }
      onPress={() => {
        if (onPress) {
          onPress();
          return;
        }
        playlistHandler([song], true);
        saveRecentlyPlayed(id);
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
              <CustomText
                numberOfLines={2}
                style={{
                  color: colors.primaryText,
                  fontSize: 16,
                }}>
                {decodeHtml(song?.title)}
              </CustomText>
              <CustomText
                numberOfLines={2}
                style={{
                  color: colors.secondaryText,
                }}>
                {song?.more_info.artistMap.primary_artists.length > 2
                  ? song?.more_info.artistMap.primary_artists
                      ?.slice(0, 2)
                      .map(artist => decodeHtml(artist.name))
                      .join(', ')
                  : song?.more_info.artistMap.primary_artists
                      .map(artist => decodeHtml(artist.name))
                      .join(', ')}
              </CustomText>
            </View>
          </View>
          <View
            style={{
              // backgroundColor: 'red',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {/* <Pressable
              style={{ justifyContent: 'center', marginRight: 5 }}
              onPress={() => {
                isLiked > -1
                  ? unLikeSong(likedSongList[isLiked].id)
                  : saveLikedSongs(id);
              }}>
              {({ pressed }) => (
                <MaterialCommunityIcons
                  name={isLiked > -1 ? 'heart' : 'heart-outline'}
                  size={24}
                  color={colors.icon}
                  style={{ opacity: pressed ? 0.7 : 1 }}
                />
              )}
            </Pressable> */}
            <Pressable
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                width: 25,
                height: 25,
                borderRadius: 12.5,
                marginRight: 15,
                borderWidth: 1,
                borderColor: colors.secondaryText,
                paddingHorizontal: 3,
              }}
              onPress={() => {
                requestStoragePermission();
                downloadFile({
                  encryptedUrl: song.more_info.encrypted_media_url,
                  fileName: decodeHtml(song.title),
                });
              }}>
              {({ pressed }) => (
                <Octicons
                  name="arrow-down"
                  size={20}
                  color={colors.icon}
                  style={{ opacity: pressed ? 0.7 : 1 }}
                />
              )}
            </Pressable>
            {/* <Pressable
              style={{ justifyContent: 'center' }}
              onPress={() => {
                SheetManager.show('song-info-sheet', { payload: song });
              }}>
              {({ pressed }) => (
                <MaterialCommunityIcons
                  name="dots-vertical"
                  size={24}
                  color={colors.icon}
                  style={{ opacity: pressed ? 0.7 : 1 }}
                />
              )}
            </Pressable> */}
          </View>
        </View>
      )}
    </Pressable>
  );
};

export default CardType1;
