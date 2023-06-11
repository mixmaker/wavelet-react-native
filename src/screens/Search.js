import {
  View,
  KeyBoard,
  TextInput,
  ActivityIndicator,
  Image,
} from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { fetchTopSearches, getResponse, searchResultsURL } from '../api';
import useAppContext from '../contexts/useAppContext';
import CardType1 from '../components/CardType1';
import { ScrollView } from 'react-native-gesture-handler';
import axios from 'axios';
import useThemeProvider from '../contexts/useThemeProvider';
import Feather from 'react-native-vector-icons/Feather';
import CustomText from '../fragments/CustomText';
import { fetchSearchResults } from '../api/base';

const Search = ({ navigation }) => {
  const { searchData, setSearchData } = useAppContext();
  const { colors, constants } = useThemeProvider();
  const [searchStr, setSearchStr] = useState('');
  const [topSearches, setTopSearches] = useState([]);
  const [loading, setLoading] = useState(false);

  const cancelTokenSource = axios.CancelToken.source();
  // const fetchSearchResults = async () => {
  //   try {
  //     const uri = searchResultsURL(searchStr);
  //     const data = await getResponse(uri, cancelTokenSource);
  //     setSearchData(data);
  //     setLoading(false);
  //   } catch (err) {
  //     if (axios.isCancel(err)) return;
  //     setLoading(false);
  //     console.log(err);
  //   }
  // };
  const searchForResults = async () => {
    const searchData = await fetchSearchResults(searchStr, cancelTokenSource);
    setSearchData(searchData);
    setLoading(false);
  };
  const topSearchHandler = async () => {
    const data = await fetchTopSearches(cancelTokenSource);
    setTopSearches(data);
  };
  useEffect(() => {
    if (searchStr !== '') {
      setTimeout(() => {
        setLoading(true);
        searchForResults();
      }, 1000);
    }
    if (searchStr === '') {
      setLoading(false);
      setSearchData({});
    }
    topSearchHandler();
    return () => {
      cancelTokenSource.cancel();
    };
  }, [searchStr]);
  const InputRef = useRef();
  setTimeout(() => InputRef.current.focus(), 100);

  return (
    <ScrollView style={{ flex: 1, marginTop: constants.statusbarHeight + 10 }}>
      <View style={{ flex: 1, paddingHorizontal: 15 }}>
        <CustomText
          style={{
            fontSize: 32,
            marginLeft: 10,
            // marginTop: 15,
            color: colors.secondaryText,
          }}>
          {' '}
          Search
        </CustomText>
        <View
          style={{
            justifyContent: 'center',
            // backgroundColor: '#00000078',
            marginBottom: 15,
            marginTop: 25,
            borderWidth: 1,
            borderColor: colors.secondaryText,
            borderRadius: 8,
          }}>
          <ActivityIndicator
            size="small"
            color={colors.primaryText}
            style={{
              position: 'absolute',
              right: 10,
              display: loading ? 'flex' : 'none',
            }}
          />
          <Feather
            name="search"
            size={20}
            color={colors.secondaryText}
            style={{
              position: 'absolute',
              left: 10,
            }}
          />
          <TextInput
            ref={InputRef}
            value={searchStr}
            onChangeText={text => setSearchStr(text)}
            style={{
              paddingVertical: 5,
              paddingHorizontal: 40,
              fontSize: 18,
              color: colors.primaryText,
              fontFamily: 'Nunito-Regular',
            }}
            placeholder="Songs, albums or artists"
            placeholderTextColor={colors.secondaryText}
          />
        </View>
        <View style={{ marginTop: 10 }}>
          {searchStr !== '' && (
            <CustomText style={{ color: colors.secondaryText }}>
              Search results for:{' '}
              <CustomText style={{ color: colors.primaryText }}>
                {searchStr}
              </CustomText>
            </CustomText>
          )}
          {searchStr === '' && topSearches?.length > 1 && (
            <>
              <View
                style={{
                  flexDirection: 'row',
                  // justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom: 10,
                }}>
                <CustomText
                  semiBold
                  style={{
                    fontSize: 20,
                    color: colors.primaryText,
                    marginRight: 5,
                  }}>
                  Trending now
                </CustomText>
                <Feather
                  name="trending-up"
                  size={20}
                  color={colors.secondaryText}
                />
              </View>
              {topSearches.map(item => (
                <View
                  key={item.id}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginHorizontal: 2,
                    marginVertical: 5,
                  }}>
                  <Image
                    source={{ uri: item.image }}
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 8,
                      marginRight: 10,
                    }}
                  />
                  <View>
                    <CustomText
                      style={{
                        fontSize: 15,
                        marginRight: 3,
                        color: colors.primaryText,
                      }}>
                      {item.title}
                    </CustomText>
                    <CustomText style={{ color: colors.secondaryText }}>
                      {item.type}
                    </CustomText>
                  </View>
                </View>
              ))}
            </>
          )}
          {searchData?.artistResults && (
            <View
              style={{
                marginTop: 25,
              }}>
              <CustomText
                semiBold
                style={{ color: colors.primaryText, fontSize: 16 }}>
                Artists
              </CustomText>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 8,
                }}>
                <Image
                  source={{
                    uri: searchData.artistResults[0].image,
                  }}
                  style={{ height: 50, width: 50, borderRadius: 25 }}
                />
                <View style={{ marginLeft: 10 }}>
                  <CustomText style={{ color: colors.primaryText }}>
                    {searchData.artistResults[0].name}
                  </CustomText>
                  <CustomText>{searchData.artistResults[0].role}</CustomText>
                </View>
              </View>
            </View>
          )}
          {searchData?.albumResults && (
            <View
              style={{
                marginTop: 25,
              }}>
              <CustomText
                semiBold
                style={{ color: colors.primaryText, fontSize: 16 }}>
                Albums
              </CustomText>
              <View>
                {searchData.albumResults.slice(0, 5).map(item => (
                  <CardType1
                    song={item}
                    key={item.id}
                    id={item.id}
                    onPress={() => {
                      // console.log(JSON.stringify(item, 4, 2));
                      navigation.navigate('DetailScreen', {
                        name: item.title,
                        image: item.image,
                        albumId: item.id,
                        type: 'album',
                      });
                    }}
                  />
                ))}
              </View>
            </View>
          )}
          {searchData?.songResults && (
            <View
              style={{
                marginTop: 25,
              }}>
              <CustomText
                semiBold
                style={{ color: colors.primaryText, fontSize: 16 }}>
                Songs
              </CustomText>
              <View>
                {searchData.songResults.splice(0, 5).map(item => (
                  <CardType1 song={item} key={item.id} id={item.id} />
                ))}
              </View>
            </View>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

export default Search;
