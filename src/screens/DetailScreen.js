import {
  View,
  Text,
  ImageBackground,
  ActivityIndicator,
  ScrollView,
  Pressable,
  StatusBar,
} from 'react-native';
import React, { useEffect } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import useAppContext from '../contexts/useAppContext';
import CardSmall from '../components/CardSmall';
import { fetchAlbumDetails, trackHelper } from '../api';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
// import {constants} from '../components/GlobalStyles';
import axios from 'axios';
import useThemeProvider from '../contexts/useThemeProvider';
import { SharedElement } from 'react-native-shared-element';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import TrackPlayer from 'react-native-track-player';

const DetailScreen = ({ route, navigation }) => {
  const { albumId, type, sharedId } = route.params;
  const { albumData, setAlbumData, isDarkMode, setPlaylist, playSongHandler } =
    useAppContext();
  const { colors, constants } = useThemeProvider();

  const cancelTokenSource = axios.CancelToken.source();
  const fetchAlbumData = async () => {
    const data = await fetchAlbumDetails(type, albumId, cancelTokenSource);
    // const albumuri = albumURL(type, albumId, cancelTokenSource);
    // const data = await getResponse(albumuri, cancelTokenSource);
    if (type === 'radio_station') {
      const array = Object.keys(data).map(key => data[key].song);
      array.splice(-1, 1); // weird api, gives last element undefined ;-;
      return setAlbumData({
        ...albumData,
        list: array,
        image: albumData.image.replace('150x150', '500x500'),
      });
    }
    if (type === 'song') {
      return setAlbumData({
        ...albumData,
        list: data.songs,
        image: albumData.image.replace('150x150', '500x500'),
      });
    }
    // console.log(JSON.stringify(data,null,4))
    setAlbumData({
      ...data,
      image: albumData.image.replace('150x150', '500x500'),
    });
  };

  useEffect(() => {
    fetchAlbumData();
    return () => {
      cancelTokenSource.cancel();
      setAlbumData(undefined);
    };
  }, [albumId]);

  return (
    <View>
      <ScrollView
        style={{
          flexGrow: 1,
          position: 'relative',
        }}>
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 0.8 }}
          colors={[
            'transparent',
            isDarkMode ? 'rgba(0,0,0,0.7)' : 'rgba(255,255,255,0.7)',
            colors.primarybg,
          ]}
          style={{
            position: 'absolute',
            top: constants.fullWidth - 190,
            left: 0,
            height: 190,
            width: constants.fullWidth,
            zIndex: -1,
          }}
        />
        <View
          style={{
            marginTop: constants.fullWidth,
            backgroundColor: colors.primarybg,
            paddingHorizontal: 15,
          }}>
          {!albumData?.list &&
            [1, 2, 3, 4, 5, 6, 7, 8].map(item => (
              <SkeletonPlaceholder
                key={item}
                backgroundColor={isDarkMode ? '#444' : '#E1E9EE'}
                highlightColor={isDarkMode ? '#5a5a5a' : '#F2F8FC'}
                speed={1200}>
                <SkeletonPlaceholder.Item
                  width={'100%'}
                  flexDirection={'row'}
                  alignItems={'center'}
                  justifyContent="space-between"
                  marginVertical={10}>
                  <SkeletonPlaceholder.Item
                    width={50}
                    height={50}
                    borderRadius={10}
                  />
                  <SkeletonPlaceholder.Item>
                    <SkeletonPlaceholder.Item width={270} height={6} />
                    <SkeletonPlaceholder.Item
                      width={150}
                      height={6}
                      marginTop={10}
                    />
                  </SkeletonPlaceholder.Item>
                  <SkeletonPlaceholder.Item
                    width={24}
                    height={24}
                    borderRadius={6}
                    marginRight={3}
                  />
                </SkeletonPlaceholder.Item>
              </SkeletonPlaceholder>
            ))}
          <Pressable
            style={{
              position: 'absolute',
              right: 30,
              top: -50,
              backgroundColor: colors.secondarybg,
              padding: 10,
              borderRadius: 30,
            }}
            onPress={() => {
              // setPlaylist(albumData.list.map(item => trackHelper(item)));
              // TrackPlayer.play();
              playSongHandler(albumData?.list);
            }}>
            <Ionicons name="play" size={28} />
          </Pressable>
          {albumData?.list?.map(item => (
            <CardSmall song={item} key={item.id} />
          ))}
        </View>
      </ScrollView>
      {/* <SharedElement id={sharedId}> */}
      <ImageBackground
        source={{ uri: albumData?.image }}
        style={{
          position: 'absolute',
          top: -10,
          left: 0,
          height: constants.fullWidth,
          width: constants.fullWidth,
          zIndex: -1,
          borderRadius: 20,
        }}
        blurRadius={!albumData?.list ? 3 : 0}
      />
      <View
        style={{
          position: 'absolute',
          top: StatusBar.currentHeight + 10,
          left: 15,
          right: 15,
          zIndex: 10,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Ionicons
          name="arrow-back"
          size={24}
          color={colors.primaryText}
          style={{
            padding: 4,
            backgroundColor: colors.primarybg,
            borderRadius: 16,
            elevation: 10,
          }}
          onPress={() => navigation.goBack()}
        />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: 4,
            paddingHorizontal: 8,
            borderRadius: 16,
            backgroundColor: colors.primarybg,
            elevation: 10,
          }}>
          <Ionicons
            name="heart-outline"
            size={24}
            color={colors.primaryText}
            style={{ marginRight: 10 }}
          />
          {/* <Ionicons name='heart' size={24} /> */}
          <Entypo
            name="dots-three-vertical"
            size={22}
            color={colors.primaryText}
          />
        </View>
      </View>
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

/*<FlatList
style={{ zIndex: 10, paddingBottom:30 }}
data={albumData?.list}
keyExtractor={item => `${item.id}detail`}
renderItem={({ item }) => <CardSmall song={item} />}
contentContainerStyle={{
  marginTop: constants.fullWidth - 30,
  backgroundColor: colors.primarybg,
  paddingHorizontal: 20,
}}
/>*/
export default DetailScreen;
