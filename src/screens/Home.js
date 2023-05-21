import { View, ScrollView } from 'react-native';
import React, { useEffect } from 'react';
import { homeDataURL } from '../api/base';
import { getResponse } from '../api';
import useAppContext from '../contexts/useAppContext';
import ListHorizontal from '../components/ListHorizontal';
import useThemeProvider from '../contexts/useThemeProvider';
import axios from 'axios';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import RecentlyPlayed from '../components/RecentlyPlayed';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import useDoublePressToExit from '../helpers/useDoublePressToExit';
import TrackPlayer from 'react-native-track-player';
import { saveResumePlayback } from '../data/helpers';
import { useNetInfo } from '@react-native-community/netinfo';
import NoNetworkComponent from '../components/NoNetworkComponent';
import CustomText from '../fragments/CustomText';

const ListSkeletonStack = ({ isDarkMode }) => {
  return (
    <SkeletonPlaceholder
      backgroundColor={isDarkMode ? '#444' : '#E1E9EE'}
      highlightColor={isDarkMode ? '#5a5a5a' : '#F2F8FC'}
      speed={1200}>
      <SkeletonPlaceholder.Item
        height={14}
        width={120}
        marginBottom={7}
        borderRadius={4}
        marginLeft={15}
      />
      <SkeletonPlaceholder.Item flexDirection="row" marginLeft={15}>
        {[1, 2, 3].map(item => (
          <SkeletonPlaceholder.Item alignItems="center" margin={7} key={item}>
            <SkeletonPlaceholder.Item
              height={150}
              width={150}
              borderRadius={10}
            />
            <SkeletonPlaceholder.Item
              height={6}
              width={120}
              marginTop={6}
              // marginLeft={15}
              // alignSelf="center"
            />
          </SkeletonPlaceholder.Item>
        ))}
      </SkeletonPlaceholder.Item>
    </SkeletonPlaceholder>
  );
};
// const postsCollection = database.get('posts');
// const createD = async () => {
//   const newPost = await database.get('posts').create(post => {
//     post.title = 'New post';
//     post.body = 'Lorem ipsum...';
//   });
//   console.log(newPost);
// };
// console.log(postsCollection);
// createD()

const Home = ({ navigation }) => {
  const { homeData, setHomeData, isDarkMode } = useAppContext();
  const { colors, constants } = useThemeProvider();
  const cancelTokenSource = axios.CancelToken.source();
  const bottomTabHeight = useBottomTabBarHeight();
  const netInfo = useNetInfo();
  const fetchHomeData = async uri => {
    try {
      const data = await getResponse(uri, cancelTokenSource);
      setHomeData(data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    const homeUri = homeDataURL();
    fetchHomeData(homeUri);
  }, [netInfo.isConnected]);

  const pauseAndSaveTime = () => {
    TrackPlayer.pause();
    const sec = TrackPlayer.getPosition();
    saveResumePlayback(id, sec);
  };
  const { closeApp } = useDoublePressToExit();

  return (
    <>
      {!netInfo.isConnected ? (
        <NoNetworkComponent />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{
            flexGrow: 1,
            backgroundColor: colors.primarybg,
            marginBottom: bottomTabHeight + 20,
          }}>
          <View style={{ marginTop: constants.statusbarHeight + 20 }}>
            {homeData?.greeting && (
              <>
                <CustomText
                  style={{
                    fontSize: 32,
                    marginBottom: 50,
                    marginLeft: 10,
                    // marginTop: 15,
                    color: colors.secondaryText,
                  }}>
                  {' '}
                  {homeData.greeting + '!'}
                </CustomText>
                <RecentlyPlayed />
                <View>
                  <ListStack
                    title={'Popular Artists'}
                    data={homeData.artist_recos}
                    navigation={navigation}
                    showTitle={true}
                    artistRow={true}
                  />
                  <ListStack
                    title={homeData.modules.city_mod?.title}
                    data={homeData.city_mod}
                    navigation={navigation}
                    showTitle={true}
                  />
                </View>
              </>
            )}
            {!homeData && (
              <>
                <SkeletonPlaceholder
                  backgroundColor={isDarkMode ? '#444' : '#E1E9EE'}
                  highlightColor={isDarkMode ? '#5a5a5a' : '#F2F8FC'}
                  speed={1200}>
                  <SkeletonPlaceholder.Item
                    height={32}
                    width={200}
                    marginTop={25}
                    marginBottom={30}
                    borderRadius={4}
                    marginLeft={10}
                  />
                </SkeletonPlaceholder>
                {[1, 2, 3].map(item => (
                  <View style={{ marginBottom: 45 }} key={item}>
                    <ListSkeletonStack isDarkMode={isDarkMode} />
                  </View>
                ))}
              </>
            )}
          </View>
        </ScrollView>
      )}
    </>
  );
};

export const ListStack = ({
  title,
  data,
  navigation,
  showTitle,
  artistRow,
}) => {
  const { colors } = useThemeProvider();
  // const isArtist =  data.more_info
  return (
    <View style={{ marginBottom: 30 }}>
      {data && (
        <>
          <CustomText
            semiBold
            style={{
              fontSize: 19,
              color: colors.primaryText,
              marginLeft: 15,
              marginBottom: 8,
            }}>
            {title}
          </CustomText>
          <ListHorizontal
            artistRow={artistRow}
            navigation={navigation}
            itemArray={data}
            showTitle={showTitle}
          />
        </>
      )}
    </View>
  );
};

export default Home;
