import { View, Text, FlatList, Pressable, Image } from 'react-native';
import React from 'react';
import useAppContext from '../contexts/useAppContext';
import CardSmall from '../components/CardSmall';
import useThemeProvider from '../contexts/useThemeProvider';

const Library = () => {
  const { playlist, setPlaylist, decodeHtml } = useAppContext();
  const { colors, constants } = useThemeProvider();

  return (
    <View style={{ marginTop: constants.statusbarHeight + 25 , paddingHorizontal: 15 }}>
      <FlatList
        data={playlist}
        ListEmptyComponent={
          <Text
            style={{
              color: colors.secondaryText,
              fontSize: 16,
              textAlign: 'center',
              justifyContent: 'center',
            }}>
            Nothing here :(
          </Text>
        }
        ListHeaderComponent={
          <Text style={{ color: colors.primaryText , fontSize: 18}}>
            Now playing
          </Text>
        }
        renderItem={({ item }) => (
          <Pressable
            activeOpacity={0.5}
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
            onPress={() => {
              // setCurrentSongId(item?.id);
            }}>
            <View
              style={{
                flex: 0.8,
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
                  source={{ uri: item.artwork }}
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
                    color: colors.primaryText,
                    fontSize: 16,
                  }}>
                  {decodeHtml(item.title)}
                </Text>
                <Text
                  numberOfLines={2}
                  style={{
                    color: colors.secondaryText,
                  }}>
                  {item.artist}
                </Text>
              </View>
            </View>
            {/* <Pressable
              style={({ pressed }) => ({
                backgroundColor: pressed ? '#444' : 'transparent',
              })}
              onPress={() => {
                addToPlaylist(item?.id);
              }}>
              {({ pressed }) => (
                <MaterialCommunityIcons
                  name="playlist-plus"
                  size={24}
                  color={colors.icon}
                />
              )}
            </Pressable> */}
          </Pressable>
        )}
      />
    </View>
  );
};

export default Library;
