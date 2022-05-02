import {
  View,
  Text,
  TextInput,
  ActivityIndicator,
  StatusBar,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { getResponse, searchResultsURL } from '../api';
import useAppContext from '../contexts/useAppContext';
import CardSmall from '../components/CardSmall';
import { ScrollView } from 'react-native-gesture-handler';
import axios from 'axios';
import useThemeProvider from '../contexts/useThemeProvider';

const Search = () => {
  const { searchData, setSearchData } = useAppContext();
  const { themeBasedStyles } = useThemeProvider();
  const [searchStr, setSearchStr] = useState('');
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
  useEffect(() => {
    if (searchStr !== '') {
      setLoading(true);
      fetchSearchResults();
    }
    if (searchStr === '') {
      setLoading(false);
      setSearchData(undefined);
    }
    return () => {
      cancelTokenSource.cancel();
    };
  }, [searchStr]);

  return (
    <ScrollView style={{ flex: 1, marginTop: StatusBar.currentHeight + 10 }}>
      <View style={{ flex: 1, paddingHorizontal: 15 }}>
        <View
          style={{
            justifyContent: 'center',
            // backgroundColor: '#00000078',
            marginBottom: 15,
            marginTop: 25,
            borderWidth: 1,
            borderColor: themeBasedStyles.secondaryText,
            borderRadius: 8,
          }}>
          <ActivityIndicator
            size="small"
            color={themeBasedStyles.primaryText}
            style={{
              position: 'absolute',
              right: 10,
              display: loading ? 'flex' : 'none',
            }}
          />
          <TextInput
            value={searchStr}
            onChangeText={text => setSearchStr(text)}
            style={{
              paddingVertical: 5,
              paddingHorizontal: 10,
              fontSize: 18,
            }}
            placeholder="Search"
          />
        </View>
        <View style={{ marginTop: 10 }}>
          {searchStr !== '' && (
            <Text style={{ color: themeBasedStyles.secondaryText }}>
              Search results for:{' '}
              <Text style={{ color: themeBasedStyles.primaryText }}>
                {searchStr}
              </Text>
            </Text>
          )}
          {searchStr === '' && (
            <Text
              style={{
                fontSize: 15,
                color: themeBasedStyles.secondaryText,
                textAlign: 'center',
              }}>
              Search for something cool!
            </Text>
          )}
          {searchData && (
            <View>
              {searchData.results.map(item => (
                <CardSmall song={item} key={item.id} />
              ))}
            </View>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

export default Search;
