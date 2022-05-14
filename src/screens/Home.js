import { View, Text, StatusBar, ScrollView } from 'react-native';
import React, { useEffect } from 'react';
import { homeDataURL } from '../api/base';
import { getResponse } from '../api';
import useAppContext from '../contexts/useAppContext';
import ListHorizontal from '../components/ListHorizontal';
import useThemeProvider from '../contexts/useThemeProvider';
import axios from 'axios';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import Entypo from 'react-native-vector-icons/Entypo';

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

const Home = ({ navigation }) => {
  const { homeData, setHomeData, isDarkMode } = useAppContext();
  const { colors, constants } = useThemeProvider();
  const cancelTokenSource = axios.CancelToken.source();

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
  }, []);
  const drawerNavigation = navigation.getParent('LeftDrawer');

  return (
    <ScrollView style={{ flexGrow: 1, backgroundColor: colors.primarybg }}>
      <View style={{ marginTop: constants.statusbarHeight + 10 }}>
        <Entypo
          name="menu"
          size={24}
          color={colors.primaryText}
          style={{ marginLeft: 15 }}
          onPress={() => {
            drawerNavigation?.openDrawer();
          }}
        />
        {homeData?.greeting && (
          <Text
            style={{
              fontSize: 32,
              marginBottom: 20,
              marginLeft: 10,
              marginTop: 15,
              color: colors.secondaryText,
            }}>
            {homeData.greeting + '!'}
          </Text>
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
        {homeData && (
          <View>
            <ListStack
              title="Editorial Picks"
              data={homeData.top_playlists}
              navigation={navigation}
            />
            <ListStack
              title={'Popular Artists'}
              data={homeData.artist_recos}
              navigation={navigation}
            />
            <ListStack
              title="New Trending"
              data={homeData.new_trending}
              navigation={navigation}
            />
            <ListStack
              title="Top Charts"
              data={homeData.charts}
              navigation={navigation}
            />
            <ListStack
              title="New Releases"
              data={homeData.new_albums}
              navigation={navigation}
            />
            <ListStack
              title={homeData.modules.city_mod?.title}
              data={homeData.city_mod}
              navigation={navigation}
            />
            <ListStack
              title={homeData.modules['promo:vx:data:9']?.title}
              data={homeData['promo:vx:data:9']}
              navigation={navigation}
            />
            <ListStack
              title={homeData.modules['promo:vx:data:68']?.title}
              data={homeData['promo:vx:data:68']}
              navigation={navigation}
            />
            {/* <ListStack
              title="Discover //couldn't find the details url"
              data={homeData.browse_discover}
              navigation={navigation}
            /> */}
            <ListStack
              title={homeData.modules['promo:vx:data:76']?.title}
              data={homeData['promo:vx:data:76']}
              navigation={navigation}
            />
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const ListStack = ({ title, data, navigation }) => {
  const { colors } = useThemeProvider();
  // const isArtist =  data.more_info
  return (
    <View style={{ marginBottom: 15 }}>
      {data && (
        <>
          <Text
            style={{
              fontSize: 19,
              color: colors.primaryText,
              marginLeft: 15,
            }}>
            {title}
          </Text>
          <ListHorizontal navigation={navigation} itemArray={data} />
        </>
      )}
    </View>
  );
};

export default Home;
