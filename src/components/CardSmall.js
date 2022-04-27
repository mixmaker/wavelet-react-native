import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import useAppContext from '../contexts/useAppContext';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import useThemeProvider from '../contexts/useThemeProvider';

const CardSmall = ({song}) => {
  const {setCurrentSongId } = useAppContext();
  const {themeBasedStyles} = useThemeProvider();
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
      onPress={() => {
        setCurrentSongId(song.id);
      }}>
      <View
        style={{
          flexDirection: 'row',
          marginVertical: 10,
          alignItems: 'center',
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
            source={{uri: song.image}}
            style={{
              height: '100%',
              width: '100%',
            }}
          />
        </View>
        <View>
          <Text
            style={{
              color: themeBasedStyles.primaryText,
              fontSize: 16,
            }}>
            {song.title}
          </Text>
          <Text
            numberOfLines={2}
            style={{
              color: themeBasedStyles.secondaryText,
            }}>
            {song.more_info.artistMap.primary_artists.length > 2
              ? song.more_info.artistMap.primary_artists
                  .slice(0, 2)
                  .map(artist => artist.name)
                  .join(', ')
              : song.more_info.artistMap.primary_artists
                  .map(artist => artist.name)
                  .join(', ')}
          </Text>
        </View>
      </View>
      <MaterialCommunityIcons
        name="playlist-plus"
        size={24}
        color={themeBasedStyles.icon}
        onPress={() => {}}
      />
    </TouchableOpacity>
  );
};

export default CardSmall;
