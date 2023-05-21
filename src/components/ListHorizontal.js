import { View, Image, Pressable, FlatList } from 'react-native';
import React from 'react';
import useAppContext from '../contexts/useAppContext';
import useThemeProvider from '../contexts/useThemeProvider';
import CustomText from '../fragments/CustomText';

const ListHorizontal = ({ showTitle, itemArray, navigation, artistRow }) => {
  const { decodeHtml } = useAppContext();
  const { colors } = useThemeProvider();
  return (
    <FlatList
      horizontal
      contentContainerStyle={{ marginLeft: 15 }}
      data={itemArray}
      showsHorizontalScrollIndicator={false}
      keyExtractor={item => `${item.title}${item.id}`}
      renderItem={({ item }) => {
        const isArtist = item.more_info?.featured_station_type === 'artist';
        return (
          <Pressable
            onPress={() =>
              navigation.navigate('DetailScreen', {
                name: item.title,
                image: item.image,
                albumId:
                  item.type === 'radio_station'
                    ? item.more_info.query
                    : item.id,
                type: item.type,
              })
            }>
            {({ pressed }) => (
              <View
                style={{
                  margin: 8,
                  width: artistRow ? 90 : 150,
                  marginRight: artistRow ? 15 : 8,
                  opacity: pressed ? 0.5 : 1,
                  transform: [{ scale: pressed ? 0.99 : 1 }],
                }}>
                <Image
                  source={{ uri: item.image }}
                  style={
                    artistRow
                      ? { height: 90, width: 90, borderRadius: 45 }
                      : {
                          height: 150,
                          width: 150,
                          borderRadius: isArtist ? 75 : 15,
                        }
                  }
                />
                {showTitle && (
                  <View>
                    <CustomText
                      numberOfLines={artistRow ? 1 : 2}
                      style={{
                        marginTop: 4,
                        textAlign: 'center',
                        color: colors.secondaryText,
                      }}>
                      {decodeHtml(item.title)}
                    </CustomText>
                  </View>
                )}
              </View>
            )}
          </Pressable>
        );
      }}
    />
  );
};

export default ListHorizontal;
