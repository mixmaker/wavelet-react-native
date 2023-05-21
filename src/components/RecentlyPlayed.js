import { saveRecentlyPlayed, observeRecentlyPlayed } from '../data/helpers';
import withObservables from '@nozbe/with-observables';
import { View, FlatList, ScrollView } from 'react-native';
import CardType2 from './CardType2';
import useThemeProvider from '../contexts/useThemeProvider';
import CustomText from '../fragments/CustomText';

const RecentlyPlayed = ({ recentlyPlayed }) => {
  const { colors, constants } = useThemeProvider();
  if (recentlyPlayed.length < 1) return null;
  var data = [];
  recentlyPlayed?.forEach(s => {
    data = [...data, s.song_id].filter(item => item);
    var arrLength = data.length;
    if (arrLength > 10) {
      data.splice(0, arrLength - 10);
    }
  });
  var numOfcol = Math.ceil(data.length / 2);
  return (
    <>
      {data.length > 1 && (
        <View style={{ marginBottom: 30 }}>
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
              }}
              numColumns={numOfcol}
              key={numOfcol}
              data={data}
              keyExtractor={item => item}
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

const EnhanceWithRP = withObservables(['recentlyPlayed'], () => ({
  recentlyPlayed: observeRecentlyPlayed(),
}));
export default EnhanceWithRP(RecentlyPlayed);
