import { View, ScrollView, Pressable } from 'react-native';
import React from 'react';
import useThemeProvider from '../contexts/useThemeProvider';
import useAppContext from '../contexts/useAppContext';
import { ListStack } from './Home';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import LinearGradient from 'react-native-linear-gradient';
import NoNetworkComponent from '../components/NoNetworkComponent';
import { useNetInfo } from '@react-native-community/netinfo';
import CustomText from '../fragments/CustomText';

const Discover = ({ navigation }) => {
  const { homeData, setHomeData, isDarkMode } = useAppContext();
  const { colors, constants } = useThemeProvider();
  const bottomTabHeight = useBottomTabBarHeight();

  // var newarr = [];
  // var homeDataArray = Object.keys(homeData?.modules)
  //   .map(key => key)
  //   .filter(item => item !== 'artist_recos' && item !== 'city_mod');
  const netInfo = useNetInfo();

  return (
    <>
      {!netInfo.isConnected ? (
        <NoNetworkComponent />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{
            flex: 1,
            backgroundColor: colors.primarybg,
            marginBottom: bottomTabHeight + 20,
          }}>
          {/* <LinearGradient
            colors={[colors.bgGradient, colors.primarybg]} //DDE5B5 3a4211
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              position: 'absolute',
              height: constants.fullHeight,
              width: constants.fullWidth,
            }}
            start={{ x: 0, y: 0 }}
            end={{ x: 0.5, y: 0.3 }}
          /> */}
          {homeData && (
            <View style={{ marginTop: constants.statusbarHeight + 20 }}>
              <View
                style={{
                  marginBottom: 50,
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexDirection: 'row',
                  marginHorizontal: 10,
                }}>
                <CustomText
                  style={{
                    fontSize: 32,
                    marginLeft: 10,
                    // marginTop: 15,
                    color: colors.secondaryText,
                  }}>
                  Discover
                </CustomText>
                <Pressable
                  style={{ padding: 5 }}
                  onPress={() => {
                    navigation.navigate('Search');
                  }}>
                  <Ionicons
                    name="search"
                    size={20}
                    color={colors.secondaryText}
                  />
                </Pressable>
              </View>

              {/* {homeDataArray &&
          homeDataArray.map(item => (
            <ListStack
              // title={homeData[item].title}
              // data={homeData[item]}
              navigation={navigation}
            />
          ))} */}
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
            </View>
          )}
        </ScrollView>
      )}
    </>
  );
};

export default Discover;
