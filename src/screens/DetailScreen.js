import { View, ScrollView, Pressable, Animated, Image } from 'react-native';
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
import CustomText from '../fragments/CustomText';
import LinearGradient from 'react-native-linear-gradient';

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
      // setAlbumData(undefined);
      // setAlbumColorPalette(undefined);
    };
  }, [albumId, albumData?.image]);

  function secondsToHms(d) {
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor((d % 3600) / 60);
    var s = Math.floor((d % 3600) % 60);

    var hDisplay = h > 0 ? h + (h == 1 ? ' hour, ' : ' h ') : '';
    var mDisplay = m > 0 ? m + (m == 1 ? ' minute, ' : ' min ') : '';
    var sDisplay = s > 0 ? s + (s == 1 ? ' second' : ' s') : '';
    return hDisplay + mDisplay + sDisplay;
  }
  return (
    <View>
      <ScrollView
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        style={{
          flexGrow: 1,
          position: 'relative',
          // paddingBottom: constants.navbarHeight
        }}>
        <View
          style={{
            marginTop: constants.statusbarHeight + 30,
            paddingVertical: 20,
            backgroundColor: colors.primarybg,
            paddingHorizontal: 25,
            position: 'relative',
          }}>
          {albumColorPalette && (
            <LinearGradient
              style={{
                backgroundColor: '#fff',
                position: 'absolute',
                top: 0,
                bottom: 0,
                right: 5,
                left: 5,
                borderRadius: 10,
                height: 200,
              }}
              colors={[
                isDarkMode
                  ? albumColorPalette.darkVibrant
                  : albumColorPalette.lightVibrant,
                colors.primarybg,
              ]}
            />
          )}
          <View
            style={{
              display: 'flex',
              flex: 2,
              flexDirection: 'row',
              marginBottom: 20,
              width: '100%',
            }}>
            <Image
              source={{ uri: albumData ? albumData.image : image }}
              style={{
                height: 170,
                width: 170,
                borderRadius: 14,
                marginRight: 20,
                marginLeft: 10,
              }}
              transition
            />
            <View style={{ width: '50%' }}>
              <CustomText
                bold
                numberOfLines={2}
                style={{
                  width: '100%',
                  // flex:1,
                  paddingRight: 10,
                  // backgroundColor: 'red',
                  fontSize: 24,
                  marginTop: 5,
                  marginBottom: 5,
                  color: colors.primaryText,
                }}>
                {decodeHtml(name)}
              </CustomText>
              {albumData && (
                <CustomText
                  semiBold
                  numberOfLines={3}
                  style={{
                    width: '100%',
                    paddingRight: 10,
                    marginBottom: 7,
                    fontSize: 17,
                    color: colors.secondaryText,
                  }}>
                  {decodeHtml(albumData?.subtitle)}
                </CustomText>
              )}
              {albumData?.list && <PlayAllButton />}
            </View>
          </View>
          {albumData?.list_count && (
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'baseline',
                marginBottom: 15,
              }}>
              <CustomText
                bold
                style={{
                  // flex:1,
                  paddingRight: 10,
                  // backgroundColor: 'red',
                  fontSize: 18,
                  color: colors.primaryText,
                }}>
                {albumData?.list_count + ' songs'}
              </CustomText>
              <CustomText style={{ fontSize: 12 }}>
                {secondsToHms(
                  albumData?.list.reduce((accumulator, object) => {
                    return accumulator + Number(object.more_info.duration);
                  }, 0),
                )}
              </CustomText>
            </View>
          )}
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
          {/* <PlayAllButton list={albumData?.list} createNewPlaylist={true} /> */}
          {albumData?.list?.map(item => (
            <CardType1 song={item} key={item.id} id={item.id} />
          ))}
        </View>
      </ScrollView>
      {/*<Animated.Image
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
          /> 
        </View>
      </Animated.View>*/}
    </View>
  );
};

const SkeletonDetailScreen = ({ isDarkMode }) => (
  <>
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
