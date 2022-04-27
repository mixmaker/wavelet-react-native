import {View, Text, TextInput, ActivityIndicator} from 'react-native';
import React, {useState, useEffect} from 'react';
import {getResponse, searchResultsURL} from '../api';
import useAppContext from '../contexts/useAppContext';
import CardSmall from '../components/CardSmall';
import {ScrollView} from 'react-native-gesture-handler';
import axios from 'axios';
import useThemeProvider from '../contexts/useThemeProvider';

const Search = () => {
  const {searchData, setSearchData} = useAppContext();
  const {themeBasedStyles} = useThemeProvider();
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
    return () => {
      cancelTokenSource.cancel();
    };
  }, [searchStr]);

  return (
    <ScrollView style={{flex: 1}}>
      <View style={{flex: 1, paddingHorizontal: 20}}>
        <View
          style={{
            justifyContent: 'center',
            // backgroundColor: '#00000078',
            marginBottom: 15,
            marginTop: 15,
            borderWidth: 1,
            borderColor: themeBasedStyles.secondaryText,
            borderRadius: 8
          }}>
          <ActivityIndicator
            size="small"
            color={themeBasedStyles.primaryText}
            style={{
              position: 'absolute',
              right: 10,
              opacity: loading ? 1 : 0,
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
        <View style={{marginTop: 10}}>
          {searchStr !== '' && (
            <Text style={{color: themeBasedStyles.secondaryText}}>
              Search results for:{' '}
              <Text style={{color: themeBasedStyles.primaryText}}>
                {searchStr}
              </Text>
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
