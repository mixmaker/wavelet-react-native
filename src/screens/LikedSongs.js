import { View, ScrollView } from 'react-native';
import React from 'react';
import useAppContext from '../contexts/useAppContext';
import useThemeProvider from '../contexts/useThemeProvider';
import CardType2 from '../components/CardType2';
import Feather from 'react-native-vector-icons/Feather';
import PlayAllButton from '../fragments/PlayAllButton';
import CustomText from '../fragments/CustomText';

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
        <CustomText
          style={{
            fontSize: 32,
            color: colors.secondaryText,
          }}>
          Liked Songs
        </CustomText>
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
              <CardType2 key={item} id={item} index={i} />
            ))}
          </>
        ) : (
          <CustomText>Nothing to show</CustomText>
        )}
      </View>
    </ScrollView>
  );
};

export default LikedSongs;
