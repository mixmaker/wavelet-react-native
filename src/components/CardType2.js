import { View, Image, Pressable, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import { fetchSongDataFromId } from '../api';
import useThemeProvider from '../contexts/useThemeProvider';
import useAppContext from '../contexts/useAppContext';
import CustomText from '../fragments/CustomText';

const CardType2 = ({ id, index }) => {
  const { playlistHandler } = useAppContext();
  const { colors, constants } = useThemeProvider();
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const fetchSongData = async () => {
    const d = await fetchSongDataFromId(id);
    setData(d);
    setLoading(false);
  };
  fetchSongData();
  return (
    <>
      {loading && index === 0 && (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginHorizontal: 10,
            width: constants.fullWidth - 100,
          }}>
          <ActivityIndicator size={'large'} />
        </View>
      )}
      {data && (
        <Pressable
          style={{
            flexDirection: 'row',
            marginVertical: 8,
          }}
          onPress={() => {
            playlistHandler([data], true);
            saveRecentlyPlayed(id);
          }}>
          <Image
            source={{ uri: data.artwork }}
            style={{
              width: 45,
              height: 45,
              marginHorizontal: 5,
              borderRadius: 8,
            }}
          />
          <View style={{ marginLeft: 3, width: 180 }}>
            <CustomText
              style={{ fontSize: 16, color: colors.primaryText }}
              numberOfLines={1}>
              {data.title}
            </CustomText>
            <CustomText
              style={{ fontSize: 14, color: colors.secondaryText }}
              numberOfLines={1}>
              {data.artist}
            </CustomText>
          </View>
        </Pressable>
      )}
    </>
  );
};

export default CardType2;
