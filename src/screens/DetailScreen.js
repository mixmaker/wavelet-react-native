import {
  View,
  Text,
  ImageBackground,
  ActivityIndicator,
  ScrollView,
  FlatList,
} from 'react-native';
import React, {useEffect} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import useAppContext from '../contexts/useAppContext';
import CardSmall from '../components/CardSmall';
import {getResponse} from '../api';
import {albumURL} from '../api/base';
// import {constants} from '../components/GlobalStyles';
import axios from 'axios';
import useThemeProvider from '../contexts/useThemeProvider';
import {SharedElement} from 'react-native-shared-element';

const DetailScreen = ({route, navigation}) => {
  const {albumId, type, sharedId} = route.params;
  const {albumData, setAlbumData, isDarkMode} = useAppContext();
  const {themeBasedStyles, constants} = useThemeProvider();

  const cancelTokenSource = axios.CancelToken.source();
  const fetchAlbumData = async () => {
    const albumuri = albumURL(type, albumId);
    const data = await getResponse(albumuri, cancelTokenSource);
    setAlbumData({
      ...data,
      image: albumData.image.replace('150x150', '500x500'),
    });
  };

  //change navbar color

  useEffect(() => {
    fetchAlbumData();
    return () => {
      setAlbumData(undefined);
    };
  }, [albumId]);

  return (
    <View>
      {!albumData?.list && <ActivityIndicator size="large" color={'#6d19fc'} />}
        <FlatList
          style={{zIndex: 10}}
          data={albumData?.list}
          keyExtractor={item => `${item.id}detail`}
          renderItem={({item}) => <CardSmall song={item} />}
          contentContainerStyle={{
            marginTop: constants.fullWidth - 30,
            backgroundColor: themeBasedStyles.primarybg,
            paddingHorizontal: 20,
          }}
        />
      {/* <SharedElement id={sharedId}> */}
      <ImageBackground
        source={{uri: albumData?.image}}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          height: constants.fullWidth,
          width: constants.fullWidth,
          zIndex: -1,
        }}
      />
      {/* </SharedElement> */}
    </View>
  );
};

// DetailScreen.sharedElements = ({route}) => {
//   const {sharedId} = route.params;
//   return [
//     {
//       id: sharedId,
//       animation: 'move',
//       resize: 'clip',
//     },
//   ];
// };
/*<LinearGradient
  colors={[
    'transparent',
    isDarkMode ? 'rgba(0,0,0,0.7)' : 'rgba(255,255,255,0.7)',
    themeBasedStyles.primarybg,
  ]}
  style={{
    position: 'absolute',
    top: -170,
    left: 0,
    height: 170,
    width: constants.fullWidth,
    zIndex: -1,
  }}
/> */
export default DetailScreen;
