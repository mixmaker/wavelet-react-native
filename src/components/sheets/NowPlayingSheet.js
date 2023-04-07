import { FlatList, View, Text, Pressable, Image } from 'react-native';
import React from 'react';
import useThemeProvider from '../../contexts/useThemeProvider';
import ActionSheet from 'react-native-actions-sheet';
import useAppContext from '../../contexts/useAppContext';
import Entypo from 'react-native-vector-icons/Entypo';
import ReorderableList from 'react-native-reorderable-list';

const NowPlayingSheet = ({ sheetId }) => {
  const { playlist, setPlaylist } = useAppContext();
  const { colors, constants } = useThemeProvider();

  const handleReorder = ({ fromIndex, toIndex }) => {
    const newData = [...playlist];
    newData.splice(toIndex, 0, newData.splice(fromIndex, 1)[0]);
    console.log(newData);
    setPlaylist(newData);
  };
  return (
    <ActionSheet
      id={sheetId}
      gestureEnabled
      containerStyle={{
        // height: '65%',
        flex: 1,
        backgroundColor: colors.primarybg,
        paddingBottom: 20,
      }}>
      <View
        style={{
          backgroundColor: colors.primarybg,
          marginHorizontal: 10,
          paddingBottom: 20,
          // alignItems:'center'
          // backgroundColor:"red"
        }}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            marginBottom: 20,
            marginTop: 5,
            color: colors.secondaryText,
            textAlign: 'center',
          }}>
          Up Next
        </Text>
        <ReorderableList
          showsVerticalScrollIndicator={false}
          data={playlist}
          onReorder={handleReorder}
          dragScale={1.025}
          renderItem={({ item, i }) => (
            <Pressable
              activeOpacity={0.5}
              style={{
                marginVertical: 10,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
              onPress={() => {
                // setCurrentSongId(item?.id);
              }}>
              <View
                style={{
                  flex: 0.8,
                  flexDirection: 'row',
                  // marginVertical: 10,
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    backgroundColor: '#f2f2f2',
                    marginRight: 15,
                    shadowColor: '#000',
                    borderRadius: 10,
                    overflow: 'hidden',
                    shadowOffset: {
                      width: 0,
                      height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    elevation: 8,
                    height: 50,
                    width: 50,
                  }}>
                  <Image
                    source={{ uri: item.artwork }}
                    style={{
                      height: '100%',
                      width: '100%',
                    }}
                  />
                </View>
                <View>
                  <Text
                    numberOfLines={2}
                    style={{
                      color: colors.primaryText,
                      fontSize: 16,
                    }}>
                    {item.title}
                  </Text>
                  <Text
                    numberOfLines={2}
                    style={{
                      color: colors.secondaryText,
                    }}>
                    {item.artist}
                  </Text>
                </View>
                {/* <MaterialCommunityIcons name='motion-play' size={20}/> */}
              </View>
            </Pressable>
          )}
        />
      </View>
    </ActionSheet>
  );
};

export default NowPlayingSheet;

///?copied from library.js
// import { View, Text, FlatList, Pressable, Image } from 'react-native';
// import React from 'react';
// import useAppContext from '../contexts/useAppContext';
// import useThemeProvider from '../contexts/useThemeProvider';

// const Library = () => {
//   const { playlist } = useAppContext();
//   const { colors, constants } = useThemeProvider();

//   return (
//     <View
//       style={{
//         paddingVertical: constants.statusbarHeight + 20,
//         backgroundColor: colors.primarybg,
//         marginLeft:20
//       }}>
//       <Text
//         style={{
//           fontSize: 32,
//           marginBottom: 50,
//           // marginTop: 15,
//           color: colors.secondaryText,
//         }}>
//         {' '}
//         Library
//       </Text>
//       <FlatList
//         showsVerticalScrollIndicator={false}
//         data={playlist}
//         ListEmptyComponent={
//           <Text
//             style={{
//               color: colors.secondaryText,
//               fontSize: 16,
//               textAlign: 'center',
//               justifyContent: 'center',
//             }}>
//             Nothing here :(
//           </Text>
//         }
//         // ListHeaderComponent={
//         //   <Text style={{ color: colors.primaryText, fontSize: 18 }}>
//         //     Now playing
//         //   </Text>
//         // }
//         renderItem={({ item }) => (
//           <Pressable
//             activeOpacity={0.5}
//             style={{
//               flexDirection: 'row',
//               justifyContent: 'space-between',
//               alignItems: 'center',
//             }}
//             onPress={() => {
//               // setCurrentSongId(item?.id);
//             }}>
//             <View
//               style={{
//                 flex: 0.8,
//                 flexDirection: 'row',
//                 // marginVertical: 10,
//                 alignItems: 'center',
//               }}>
//               <View
//                 style={{
//                   backgroundColor: '#f2f2f2',
//                   marginRight: 15,
//                   shadowColor: '#000',
//                   borderRadius: 10,
//                   overflow: 'hidden',
//                   shadowOffset: {
//                     width: 0,
//                     height: 2,
//                   },
//                   shadowOpacity: 0.25,
//                   shadowRadius: 3.84,
//                   elevation: 8,
//                   height: 50,
//                   width: 50,
//                 }}>
//                 <Image
//                   source={{ uri: item.artwork }}
//                   style={{
//                     height: '100%',
//                     width: '100%',
//                   }}
//                 />
//               </View>
//               <View>
//                 <Text
//                   numberOfLines={2}
//                   style={{
//                     color: colors.primaryText,
//                     fontSize: 16,
//                   }}>
//                   {item.title}
//                 </Text>
//                 <Text
//                   numberOfLines={2}
//                   style={{
//                     color: colors.secondaryText,
//                   }}>
//                   {item.artist}
//                 </Text>
//               </View>
//             </View>
//             {/* <Pressable
//               style={({ pressed }) => ({
//                 backgroundColor: pressed ? '#444' : 'transparent',
//               })}
//               onPress={() => {
//                 addToPlaylist(item?.id);
//               }}>
//               {({ pressed }) => (
//                 <MaterialCommunityIcons
//                   name="playlist-plus"
//                   size={24}
//                   color={colors.icon}
//                 />
//               )}
//             </Pressable> */}
//           </Pressable>
//         )}
//       />
//     </View>
//   );
// };

// export default Library;
