import {View, Text, Image, TouchableOpacity, FlatList} from 'react-native';
import React from 'react';
import useAppContext from '../contexts/useAppContext';
import useThemeProvider from '../contexts/useThemeProvider';
import {SharedElement} from 'react-native-shared-element';

const ListHorizontal = ({itemArray, navigation, isArtist, row}) => {
  const {albumData, setAlbumData, isDarkMode} = useAppContext();
  const {themeBasedStyles} = useThemeProvider();
  return (
    <FlatList
      horizontal
      data={itemArray}
      showsHorizontalScrollIndicator={false}
      keyExtractor={item => `${item.title}${item.id}`}
      renderItem={({item}) => (
        <TouchableOpacity
          onPress={() => {
            setAlbumData({...albumData, image: item.image});
            navigation.navigate('DetailScreen', {
              name: item.title,
              albumId: item.id,
              type: item.type,
              // sharedId: `${row}.${item.id}.image`,
            });
          }}>
          <View
            style={{
              margin: 7,
              width: 150,
            }}>
            {/* <SharedElement id={`${row}.${item.id}.image`}> */}
              <Image
                source={{uri: item.image}}
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
                {item.title}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

export default ListHorizontal;
