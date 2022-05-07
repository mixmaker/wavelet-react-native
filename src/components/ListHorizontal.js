import { View, Text, Image, Pressable, FlatList } from 'react-native';
import React from 'react';
import useAppContext from '../contexts/useAppContext';
import useThemeProvider from '../contexts/useThemeProvider';
import { SharedElement } from 'react-native-shared-element';

const ListHorizontal = ({ itemArray, navigation }) => {
  const { albumData, setAlbumData, decodeHtml } = useAppContext();
  const { themeBasedStyles } = useThemeProvider();
  return (
    <FlatList
      horizontal
      contentContainerStyle={{ marginLeft: 15 }}
      data={itemArray}
      showsHorizontalScrollIndicator={false}
      keyExtractor={item => `${item.title}${item.id}`}
      renderItem={({ item }) => {
        const isArtist =
          item.more_info?.featured_station_type === 'artist' ? true : false;
        return (
          <Pressable
            onPress={() => {
              setAlbumData({ ...albumData, image: item.image });
              navigation.navigate('DetailScreen', {
                name: item.title,
                albumId:
                  item.type === 'radio_station'
                    ? item.more_info.query
                    : item.id,
                type: item.type,
                // sharedId: `${row}.${item.id}.image`,
              });
            }}>
            {({ pressed }) => (
              <View
                style={{
                  margin: 7,
                  width: 150,
                  opacity: pressed ? 0.5 : 1,
                  transform: [{ scale: pressed ? 0.99 : 1 }],
                }}>
                {/* <SharedElement id={`${row}.${item.id}.image`}> */}
                <Image
                  source={{ uri: item.image }}
                  style={{
                    height: 150,
                    width: 150,
                    borderRadius: isArtist ? 75 : 10,
                  }}
                />
                {/* </SharedElement> */}
                <View>
                  <Text
                    numberOfLines={2}
                    style={{
                      marginTop: 4,
                      textAlign: 'center',
                      color: themeBasedStyles.secondaryText,
                    }}>
                    {decodeHtml(item.title)}
                  </Text>
                </View>
              </View>
            )}
          </Pressable>
        );
      }}
    />
  );
};

export default ListHorizontal;
