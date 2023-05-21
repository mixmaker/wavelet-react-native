import { View, FlatList, Pressable, Image } from 'react-native';
import React from 'react';
import useAppContext from '../contexts/useAppContext';
import useThemeProvider from '../contexts/useThemeProvider';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { observeLikedSongs, observeRecentlyPlayed } from '../data/helpers';
import withObservables from '@nozbe/with-observables';
import CustomText from '../fragments/CustomText';

const Library = ({ recentlyPlayed, likedSongs, navigation }) => {
  const { playlist } = useAppContext();
  const { colors, constants } = useThemeProvider();
  return (
    <View
      style={{
        paddingVertical: constants.statusbarHeight + 20,
        backgroundColor: colors.primarybg,
        marginLeft: 20,
      }}>
      <CustomText
        style={{
          fontSize: 32,
          marginBottom: 50,
          // marginTop: 15,
          color: colors.secondaryText,
        }}>
        Library
      </CustomText>
      <Pressable
        onPress={() =>
          navigation.navigate('LikedSongs', {
            dataArr: likedSongs.forEach(s => s.song_id),
          })
        }
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginVertical: 10,
        }}>
        <Feather
          name="heart"
          size={24}
          color={'#fcfcfc'}
          style={{
            marginRight: 20,
            backgroundColor: '#8a7dff',
            padding: 7,
            borderRadius: 8,
          }}
        />
        <View style={{ justifyContent: 'center' }}>
          <CustomText semiBold style={{ color: colors.primaryText }}>Liked Songs</CustomText>
          <CustomText style={{ color: colors.secondaryText }}>
            {likedSongs.length} song(s)
          </CustomText>
        </View>
      </Pressable>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginVertical: 10,
        }}>
        <MaterialCommunityIcons
          name="history"
          size={24}
          color={'#fcfcfc'}
          style={{
            marginRight: 20,
            backgroundColor: '#ff7dd6',
            padding: 7,
            borderRadius: 8,
          }}
        />
        <View style={{ justifyContent: 'center' }}>
          <CustomText semiBold style={{ color: colors.primaryText }}>Recently Played</CustomText>
          <CustomText style={{ color: colors.secondaryText }}>
            {recentlyPlayed.length} song(s)
          </CustomText>
        </View>
      </View>
      <CustomText>Add playlist</CustomText>
    </View>
  );
};
const EnhanceWithRPLS = withObservables(
  ['recentlyPlayed', 'likedSongs'],
  () => ({
    recentlyPlayed: observeRecentlyPlayed(),
    likedSongs: observeLikedSongs(),
  }),
);
export default EnhanceWithRPLS(Library);
