import { View, Text, TextInput, ActivityIndicator, Image } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { fetchTopSearches, getResponse, searchResultsURL } from '../api';
import useAppContext from '../contexts/useAppContext';
import CardType1 from '../components/CardType1';
import { ScrollView } from 'react-native-gesture-handler';
import axios from 'axios';
import useThemeProvider from '../contexts/useThemeProvider';
import Feather from 'react-native-vector-icons/Feather';

const Search = () => {
  const { searchData, setSearchData } = useAppContext();
  const { colors, constants } = useThemeProvider();
  const [searchStr, setSearchStr] = useState('');
  const [topSearches, setTopSearches] = useState([]);
  const [loading, setLoading] = useState(false);

  const cancelTokenSource = axios.CancelToken.source();
  const fetchSearchResults = async () => {
    try {
      const uri = searchResultsURL(searchStr);
      const data = await getResponse(uri, cancelTokenSource);
      setSearchData(data);
      setLoading(false);
    } catch (err) {
      if (axios.isCancel(err)) return;
      setLoading(false);
      console.log(err);
    }
  };
  const topSearchHandler = async () => {
    const data = await fetchTopSearches(cancelTokenSource);
    setTopSearches(data);
  };
  useEffect(() => {
    if (searchStr !== '') {
      setTimeout(() => {
        setLoading(true);
        fetchSearchResults();
      }, 300);
    }
    if (searchStr === '') {
      setLoading(false);
      setSearchData(undefined);
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
          <TextInput
            ref={InputRef}
            value={searchStr}
            onChangeText={text => setSearchStr(text)}
            style={{
              paddingVertical: 5,
              paddingHorizontal: 10,
              fontSize: 18,
              color: colors.primaryText,
            }}
            placeholder="Search"
            placeholderTextColor={colors.secondaryText}
          />
        </View>
        <View style={{ marginTop: 10 }}>
          {searchStr !== '' && (
            <Text style={{ color: colors.secondaryText }}>
              Search results for:{' '}
              <Text style={{ color: colors.primaryText }}>{searchStr}</Text>
            </Text>
          )}
          {searchStr === '' && topSearches.length > 1 && (
            <>
              <View
                style={{
                  flexDirection: 'row',
                  // justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom: 10,
                }}>
                <Text
                  style={{
                    fontSize: 20,
                    color: colors.primaryText,
                    marginRight: 5,
                  }}>
                  Trending now
                </Text>
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
                    <Text
                      style={{
                        fontSize: 15,
                        marginRight: 3,
                        color: colors.primaryText,
                      }}>
                      {item.title}
                    </Text>
                    <Text style={{ color: colors.secondaryText }}>
                      {item.type}
                    </Text>
                  </View>
                </View>
              ))}
            </>
          )}
          {searchData && (
            <View>
              {searchData.results.map(item => (
                <CardType1 song={item} key={item.id} id={item.id} />
              ))}
            </View>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

export default Search;
