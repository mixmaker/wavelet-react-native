import ActionSheet, { SheetProps } from 'react-native-actions-sheet';
import { View, Image, Pressable, ToastAndroid } from 'react-native';
import React, { useRef } from 'react';
import useThemeProvider from '../../contexts/useThemeProvider';
import useAppContext from '../../contexts/useAppContext';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { saveLikedSongs, unLikeSong } from '../../data/helpers';
import CustomText from '../../fragments/CustomText';

const SongInfoSheet = ({ payload, sheetId }) => {
  const { colors } = useThemeProvider();
  const { decodeHtml, likedSongList } = useAppContext();
  const navigation = useNavigation();
  const songInfoSheetRef = useRef(null);
  const onpressTemp = () => {
    ToastAndroid.show('Coming Soon', ToastAndroid.SHORT);
  };
  const viewAlbumHandler = () => {
    songInfoSheetRef?.current.hide();
    navigation.navigate('DetailScreen', {
      name: payload.more_info.album,
      image: payload.image,
      albumId: payload.more_info.album_id,
      type: 'album',
    });
  };
  const isLiked = likedSongList.indexOf(payload.id);

  const buttons = [
    {
      name: isLiked > -1 ? 'Remove from likes' : 'Like',
      onPress: () => {
        isLiked > -1
          ? unLikeSong(likedSongList[isLiked])
          : saveLikedSongs(payload.id);
      },
      icon: isLiked > -1 ? 'heart-minus' : 'heart-outline',
    },
    { name: 'Add to Playlist', onPress: onpressTemp, icon: 'music-note-plus' },
    { name: 'Add to Queue', onPress: onpressTemp, icon: 'playlist-plus' },
    { name: 'View Album', onPress: viewAlbumHandler, icon: 'album' },
    { name: 'View Artist', onPress: onpressTemp, icon: 'account-music' },
  ];
  return (
    <ActionSheet
      // useBottomSafeAreaPadding
      ref={songInfoSheetRef}
      defaultOverlayOpacity={0.95}
      overlayColor={colors.primarybg}
      containerStyle={{
        // height: '65%',
        flex: 1,
        backgroundColor: colors.primarybg,
        paddingBottom: 20,
      }}
      id={sheetId}
      snapPoints={[0, 60]}
      initialSnapIndex={1}>
      <View style={{ alignItems: 'center', marginBottom: 20 }}>
        <Image
          source={{ uri: payload?.image }}
          style={{ height: 140, width: 140 }}
        />
        <CustomText
          numberOfLines={1}
          style={{ color: colors.primaryText, marginTop: 10, fontSize: 16 }}>
          {decodeHtml(payload?.title)}
        </CustomText>
        <CustomText
          numberOfLines={1}
          style={{
            color: colors.secondaryText,
            fontSize: 14,
          }}>
          {payload?.more_info.artistMap.primary_artists.length > 2
            ? payload?.more_info.artistMap.primary_artists
                .slice(0, 2)
                .map(artist => decodeHtml(artist.name))
                .join(', ')
            : payload?.more_info.artistMap.primary_artists
                .map(artist => decodeHtml(artist.name))
                .join(', ')}
        </CustomText>
      </View>
      <View style={{ paddingHorizontal: 10 }}>
        {buttons.map(button => (
          <Pressable
            key={button.icon}
            onPress={() => button.onPress()}
            style={({ pressed }) => ({
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: 15,
              paddingVertical: 15,
              opacity: pressed ? 0.6 : 1,
            })}>
            <MaterialCommunityIcons
              name={button.icon}
              color={colors.secondaryText}
              size={20}
            />
            <CustomText
              style={{
                marginLeft: 10,
                color: colors.primaryText,
                fontSize: 16,
              }}>
              {button.name}
            </CustomText>
          </Pressable>
        ))}
      </View>
    </ActionSheet>
  );
};

export default SongInfoSheet;