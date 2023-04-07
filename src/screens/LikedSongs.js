import { View, Text, ScrollView } from 'react-native';
import React from 'react';
import useAppContext from '../contexts/useAppContext';
import useThemeProvider from '../contexts/useThemeProvider';
import CardType2 from '../components/CardType2';
import Feather from 'react-native-vector-icons/Feather';
import PlayAllButton from '../components/PlayAllButton';

const LikedSongs = ({ navigation }) => {
  const { likedSongList } = useAppContext();
  const { constants, colors } = useThemeProvider();

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ flexGrow: 1 }}
      style={{
        paddingVertical: constants.statusbarHeight + 20,
        backgroundColor: colors.primarybg,
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginHorizontal: 20,
        }}>
        <Feather
          name="arrow-left"
          size={24}
          color={colors.secondaryText}
          style={{ marginRight: 20, paddingTop: 5 }}
          onPress={() => navigation.goBack()}
        />
        <Text
          style={{
            fontSize: 32,
            color: colors.secondaryText,
          }}>
          Liked Songs
        </Text>
      </View>
      <View
        style={{
          marginHorizontal: 20,
          marginTop: 20,
          paddingBottom: 5,
        }}>
        {likedSongList.length > 0 ? (
          <>
            <PlayAllButton list={{}} createNewPlaylist={true} />
            {likedSongList.map((item, i) => (
              <CardType2 key={item.id} id={item.songId} index={i} />
            ))}
          </>
        ) : (
          <Text>Nothing to show</Text>
        )}
      </View>
    </ScrollView>
  );
};

export default LikedSongs;
