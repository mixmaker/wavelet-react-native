import ActionSheet, { SheetProps } from 'react-native-actions-sheet';
import { View, Text, Image, Pressable, ToastAndroid } from 'react-native';
import React, { useRef } from 'react';
import useThemeProvider from '../../contexts/useThemeProvider';
import useAppContext from '../../contexts/useAppContext';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { saveLikedSongs, unLikeSong } from '../../data/helpers';

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
  const isLiked = likedSongList.map(l => l?.songId).indexOf(payload.id);

  const buttons = [
    {
      name: isLiked > -1 ? 'Remove from likes' : 'Like',
      onPress: () => {
        isLiked > -1
          ? unLikeSong(likedSongList[isLiked].id)
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
        <Text
          numberOfLines={1}
          style={{ color: colors.primaryText, marginTop: 10, fontSize: 16 }}>
          {decodeHtml(payload?.title)}
        </Text>
        <Text
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
        </Text>
      </View>
      <View style={{ paddingHorizontal: 10 }}>
        {buttons.map(button => (
          <Pressable
            key={button.icon}
            onPress={() => button.onPress()}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginHorizontal: 15,
              marginVertical: 15,
            }}>
            <MaterialCommunityIcons
              name={button.icon}
              color={colors.secondaryText}
              size={20}
            />
            <Text
              style={{
                marginLeft: 10,
                color: colors.primaryText,
                fontSize: 16,
              }}>
              {button.name}
            </Text>
          </Pressable>
        ))}
      </View>
    </ActionSheet>
  );
};

export default SongInfoSheet;

const d = {
  explicit_content: '0',
  header_desc: '',
  id: 'EbFWakDs',
  image:
    'http://c.saavncdn.com/191/Kesariya-From-Brahmastra-Hindi-2022-20220717092820-150x150.jpg',
  language: 'hindi',
  list: '',
  list_count: '0',
  list_type: '',
  more_info: {
    '320kbps': 'true',
    album: 'Kesariya (From &quot;Brahmastra&quot;)',
    album_id: '36552397',
    album_url:
      'https://www.jiosaavn.com/album/kesariya-from-brahmastra/3RMVXHzqov8_',
    artistMap: {
      artists: [Array],
      featured_artists: [Array],
      primary_artists: [Array],
    },
    cache_state: '',
    copyright_text: '(P) 2022 Sony Music Entertainment India Pvt. Ltd.',
    duration: '268',
    encrypted_cache_url: '',
    encrypted_media_url:
      'ID2ieOjCrwfgWvL5sXl4B1ImC5QfbsDynOFTlSZdUD2jEAOf0IlvwvgBDWbHt9mpvSnuzek+bNWUCv8SK258cBw7tS9a8Gtq',
    has_lyrics: 'false',
    is_dolby_content: false,
    is_ringtone_available: false,
    label: 'Sony Music Entertainment India Pvt. Ltd.',
    label_url:
      '/label/sony-music-entertainment-india-pvt.-ltd.-albums/LaFAA6h1q2U_',
    lyrics_snippet: '',
    music: 'Pritam',
    origin: 'playlist',
    release_date: '2022-07-17',
    request_jiotune_flag: false,
    rights: {
      cacheable: 'true',
      code: '0',
      delete_cached_object: 'false',
      reason: '',
    },
    starred: 'false',
    triller_available: false,
    vcode: '010910141624103',
    vlink:
      'https://jiotunepreview.jio.com/content/Converted/010910141580615.mp3',
    webp: 'true',
  },
  perma_url:
    'https://www.jiosaavn.com/song/kesariya-from-brahmastra/NQotZhVbc0A',
  play_count: '135110493',
  subtitle:
    'Pritam, Arijit Singh, Amitabh Bhattacharya - Kesariya (From &quot;Brahmastra&quot;)',
  title: 'Kesariya (From &quot;Brahmastra&quot;)',
  type: 'song',
  year: '2022',
};
