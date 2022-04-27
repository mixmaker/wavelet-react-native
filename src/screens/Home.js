import {View, Text, ActivityIndicator, ScrollView} from 'react-native';
import React, {useEffect} from 'react';
import {homeDataURL} from '../api/base';
import {getResponse} from '../api';
import useAppContext from '../contexts/useAppContext';
import ListHorizontal from '../components/ListHorizontal';
import useThemeProvider from '../contexts/useThemeProvider';
import axios from 'axios';

const Home = ({navigation}) => {
  const {homeData, setHomeData, error, setError} = useAppContext();
  const cancelTokenSource = axios.CancelToken.source()

  const fetchHomeData = async uri => {
    try {
      const data = await getResponse(uri, cancelTokenSource);
      setHomeData(data);
    } catch (err) {
      console.log(JSON.stringify(err, null, 4));
      setError(err);
    }
  };
  useEffect(() => {
    const homeUri = homeDataURL();
    fetchHomeData(homeUri);
  }, []);
  return (
    <ScrollView style={{flexGrow: 1}}>
      <View style={{margin: 20}}>
        {!homeData && !error && (
          <ActivityIndicator size="large" color={'#6d19fc'} />
        )}
        {/* {error && <Text>{error}</Text>} */}
        {homeData && (
          <>
            {/* <Text
              style={{
                ...GlobalStyles.primaryText,
                fontSize: 22,
                // paddingTop: 20,
                // paddingLeft: 20,
                paddingBottom: 10,
                // backgroundColor: '#fff',
                fontWeight: '700',
              }}>
              {homeData.greeting}
            </Text> */}
            <View>
              <ListStack
                title="Editorial Picks"
                data={homeData.top_playlists}
                navigation={navigation}
                row="1"
              />
              <ListStack
                title={'Popular Artists'}
                data={homeData.artist_recos}
                navigation={navigation}
                isArtist
                row="2"
              />
              <ListStack
                title="New Trending"
                data={homeData.new_trending}
                navigation={navigation}
                row="3"
              />
              <ListStack
                title="Top Charts"
                data={homeData.charts}
                navigation={navigation}
                row="4"
              />
              <ListStack
                title={homeData.modules.city_mod?.title}
                data={homeData.city_mod}
                navigation={navigation}
                row="5"
              />
              <ListStack
                title="Discover"
                data={homeData.browse_discover}
                navigation={navigation}
                row="6"
              />
              <ListStack
                title="New Releases"
                data={homeData.new_albums}
                navigation={navigation}
                row="7"
              />
            </View>
          </>
        )}
      </View>
    </ScrollView>
  );
};

const ListStack = ({title, data, navigation, isArtist, row}) => {
  const {themeBasedStyles} = useThemeProvider();
  return (
    <View style={{marginBottom: 15}}>
      {data && (
        <>
          <Text style={{fontSize: 20, color: themeBasedStyles.primaryText}}>
            {title}
          </Text>
          <ListHorizontal
            navigation={navigation}
            itemArray={data}
            isArtist={isArtist}
            row={row}
          />
        </>
      )}
    </View>
  );
};

export default Home;
