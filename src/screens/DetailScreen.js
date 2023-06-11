import { View, ScrollView, Pressable, Animated, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import useAppContext from '../contexts/useAppContext';
import CardType1 from '../components/CardType1';
import { fetchAlbumDetails } from '../api';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import useThemeProvider from '../contexts/useThemeProvider';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import ImageColors from 'react-native-image-colors';
import PlayAllButton from '../fragments/PlayAllButton';

const DetailScreen = ({ route, navigation }) => {
  const { albumId, type, name, image } = route.params;
  const { isDarkMode, decodeHtml } = useAppContext();
  const { colors, constants } = useThemeProvider();
  const [albumData, setAlbumData] = useState();
  const [albumColorPalette, setAlbumColorPalette] = useState();

  const cancelTokenSource = axios.CancelToken.source();
  const fetchAlbumData = async () => {
    const data = await fetchAlbumDetails(type, albumId, cancelTokenSource);
    if (type === 'radio_station') {
      const array = Object.keys(data).map(key => data[key].song);
      array.splice(-1, 1); // weird api, gives last element undefined ;-;
      return setAlbumData({
        ...albumData,
        list: array,
        image: image.replace('150x150', '500x500'),
      });
    }
    if (type === 'song') {
      return setAlbumData({
        ...albumData,
        list: data.songs,
        image: image.replace('150x150', '500x500'),
      });
    }
    setAlbumData({
      ...data,
      image: image.replace('150x150', '500x500'),
    });
  };
  const getAlbumColors = async () => {
    const palette = await ImageColors.getColors(albumData.image);
    setAlbumColorPalette(palette);
  };
  useEffect(() => {
    fetchAlbumData();
    albumData?.image && getAlbumColors();
    return () => {
      cancelTokenSource.cancel();
      setAlbumData(undefined);
      setAlbumColorPalette(undefined);
    };
  }, [albumId]);
  const HEADER_MAX_HEIGHT = constants.fullWidth;
  const HEADER_MIN_HEIGHT = 80;
  const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;
  const scrollY = useState(new Animated.Value(0))[0];

  const headerHeight = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
    extrapolate: 'clamp',
  });
  const imageOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
    outputRange: [1, 1, 0],
    extrapolate: 'clamp',
  });
  const imageTranslate = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [0, -50],
    extrapolate: 'clamp',
  });
  const textTranslate = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [0, -15],
    extrapolate: 'clamp',
  });
  const bgColor = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: ['transparent', albumColorPalette?.darkVibrant || '#ce6c6c'],
    extrapolate: 'clamp',
  });
  return (
    <View>
      <ScrollView
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false },
        )}
        style={{
          flexGrow: 1,
          position: 'relative',
          // paddingBottom: constants.navbarHeight
        }}>
        <View
          style={{
            marginTop: constants.fullWidth,
            paddingVertical: 20,
            backgroundColor: colors.primarybg,
            paddingHorizontal: 25,
          }}>
          {!albumData?.list && <SkeletonDetailScreen isDarkMode={isDarkMode} />}
          {/* <Pressable
            style={{
              position: 'absolute',
              right: 30,
              top: -30,
              backgroundColor: colors.secondarybg,
              padding: 10,
              borderRadius: 30,
              zIndex: 15,
            }}
            onPress={() => {
              console.log('first')
              playlistHandler(albumData?.list, true);
              // setPlaylist(albumData.list.map(item => trackHelper(item)));
              // TrackPlayer.play();
              // console.log('first')
              // playSongHandler(albumData?.list, true);
            }}>
            <Ionicons name="play" size={28} color={colors.primaryText} />
          </Pressable> */}
          <PlayAllButton list={albumData?.list} createNewPlaylist={true} />
          {albumData?.list?.map(item => (
            <CardType1 song={item} key={item.id} id={item.id} />
          ))}
        </View>
      </ScrollView>
      <Animated.Image
        source={{ uri: albumData ? albumData.image : image }}
        transition
        style={[
          {
            position: 'absolute',
            top: 0,
            left: 0,
            height: HEADER_MAX_HEIGHT,
            width: constants.fullWidth,
            zIndex: -1,
            borderBottomRightRadius: 20,
            borderBottomLeftRadius: 20,
          },
          {
            opacity: imageOpacity,
            transform: [{ translateY: imageTranslate }],
          },
        ]}
        blurRadius={albumData?.list ? 0 : 7}
      />
      <Animated.View
        style={[
          {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            overflow: 'hidden',
            paddingTop: constants.statusbarHeight + 20,
          },
          { height: headerHeight, backgroundColor: bgColor },
        ]}>
        <View
          style={{
            height: HEADER_MIN_HEIGHT,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            paddingBottom: 35,
          }}>
          <Animated.Text
            style={{
              color: '#fff',
              fontSize: 18,
              transform: [{ translateY: textTranslate }],
              fontFamily:'Nunito-Regular'
            }}>
            {decodeHtml(name)}
          </Animated.Text>
          {/* <Ionicons
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
          /> */}
        </View>
      </Animated.View>
    </View>
  );
};

const SkeletonDetailScreen = ({ isDarkMode }) => (
  <>
    <SkeletonPlaceholder
      backgroundColor={isDarkMode ? '#444' : '#E1E9EE'}
      highlightColor={isDarkMode ? '#5a5a5a' : '#F2F8FC'}
      speed={1200}>
      <SkeletonPlaceholder.Item
        width={80}
        height={35}
        borderRadius={8}
        style={{ marginBottom: 15 }}
      />
    </SkeletonPlaceholder>
    {[1, 2, 3, 4, 5, 6, 7, 8].map(item => (
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
          <SkeletonPlaceholder.Item width={50} height={50} borderRadius={10} />
          <SkeletonPlaceholder.Item>
            <SkeletonPlaceholder.Item width={270} height={6} />
            <SkeletonPlaceholder.Item width={150} height={6} marginTop={10} />
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
  </>
);
export default DetailScreen;
