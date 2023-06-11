import { saveRecentlyPlayed, observeRecentlyPlayed } from '../data/helpers';
import withObservables from '@nozbe/with-observables';
import { View, FlatList, ScrollView } from 'react-native';
import { useEffect, useState } from 'react';
import CardType2 from './CardType2';
import useThemeProvider from '../contexts/useThemeProvider';
import CustomText from '../fragments/CustomText';
import storage from '../data/storage';
import useAppContext from '../contexts/useAppContext';

const RecentlyPlayed = () => {
  const { colors, constants } = useThemeProvider();
  const {recentlyPlayed, setRecentlyPlayed} = useAppContext()
  // useEffect(() => {
  //   const data = storage.getString('recentlyPlayed');
  //   if (data) setRecentlyPlayed(JSON.parse(data));
  // }, []);

  if (recentlyPlayed.length < 1) return null;
  // var data = [];
  if (recentlyPlayed.length > 10)
    recentlyPlayed.splice(0, recentlyPlayed.length - 10);
  // recentlyPlayed?.forEach(s => {
  //   data = [...data, s.song_id].filter(item => item);
  //   var arrLength = data.length;
  //   if (arrLength > 10) {
  //     data.splice(0, arrLength - 10);
  //   }
  // });
  var numOfcol = Math.ceil(recentlyPlayed.length / 2);
  return (
    <>
      {recentlyPlayed.length > 0 && (
        <View style={{ marginBottom: 30, marginLeft: 0 }}>
          <CustomText
            style={{
              fontSize: 19,
              color: colors.primaryText,
              marginLeft: 20,
              marginBottom: 8,
            }}>
            Recently played
          </CustomText>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <FlatList
              contentContainerStyle={{
                alignSelf: 'flex-start',
                paddingRight: 50,
                paddingLeft: 25,
              }}
              numColumns={numOfcol}
              key={numOfcol}
              data={recentlyPlayed}
              keyExtractor={(item, index) => `${item}-${index}`}
              renderItem={({ item, index }) => (
                <CardType2 id={item} index={index} />
              )}
              // horizontal
              // numColumns={2}
              // contentContainerStyle={{ flex: 1, flexDirection: 'column' }}
              // data={data.reduce((all, one, i) => {
              //   const ch = Math.floor(i / 2);
              //   all[ch] = [].concat(all[ch] || [], one);
              //   return all;
              // }, [])}
              // data={[
              //   ['CGfOlner', '8fPg_mQR'],
              //   // ['EuQ2PQJi', 'EIdYxJXT'],
              // ]}
              // numColumns={2}
              // keyExtractor={item => item}
              // renderItem={({ item }) => {
              //   console.log(item);
              //   item.map(i => {
              //     console.log(i);
              //     return <CardType2 id={i} />;
              //   });
              // }}
              // renderItem={({ item }) => {
              //   return item.map(i => <CardType2 id={i} />);
              // }}
            />
          </ScrollView>
        </View>
      )}
    </>
  );
};

// const EnhanceWithRP = withObservables(['recentlyPlayed'], () => ({
//   recentlyPlayed: observeRecentlyPlayed(),
// }));
// export default EnhanceWithRP(RecentlyPlayed);
export default RecentlyPlayed;
