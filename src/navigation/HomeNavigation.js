import {View, Text,TouchableOpacity} from 'react-native';
import React from 'react';
import {
  BottomTabBar,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Home from '../screens/Home';
import Search from '../screens/Search';
import Playlists from '../screens/Playlists';
import MiniPlayer from '../components/MiniPlayer';
import {BlurView} from '@react-native-community/blur';

const HomeNavigation = () => {
  const HomeTab = createBottomTabNavigator();

  const CustomTabBar = props => {
    // const {
    //   renderIcon,
    //   getLabelText,
    //   activeTintColor,
    //   inactiveTintColor,
    //   onTabPress,
    //   onTabLongPress,
    //   // getAccessibilityLabel,
    //   state
    // } = props;
  
    // const { routes, index: activeRouteIndex } = state;
    // console.log(JSON.stringify(props, null,4))
    // return(
  //     <View>
  //     {routes.map((route, routeIndex) => {
  //       const isRouteActive = routeIndex === activeRouteIndex;
  //       const tintColor = isRouteActive ? activeTintColor : inactiveTintColor;

  //       return (
  //         <TouchableOpacity
  //           key={routeIndex}
  //           // style={S.tabButton}
  //           onPress={() => {
  //             onTabPress({ route });
  //           }}
  //           onLongPress={() => {
  //             onTabLongPress({ route });
  //           }}
  //           // accessibilityLabel={getAccessibilityLabel({ route })}
  //         >
  //           {renderIcon({ route, focused: isRouteActive, tintColor })}

  //           <Text>{getLabelText({ route })}</Text>
  //         </TouchableOpacity>
  //       );
  //     })}
  //   </View>
  //   )
  // }
    return (
      <View style={{backgroundColor: 'transparent'}}>
        <BlurView
          style={{
            height: 50,
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            // backgroundColor:'#000'
          }}
          tint="light"
          intensity={40}
          overlayColor=""
        />
        <MiniPlayer />
        <BottomTabBar {...props} style={{height: 50, backgroundColor:'yellow'}} />
      </View>
    );
  };


  return (
    <HomeTab.Navigator
      sceneContainerStyle={{backgroundColor: 'transparent'}}
      tabBar={props => <CustomTabBar {...props} />}
      screenOptions={{
        tabBarShowLabel:false,
        // tabBarActiveTintColor: '#6d19fc',
        // tabBarStyle: { position: 'absolute' },
        // tabBarBackground: () => (
        //   // <View style={{backgroundColor:'yellow', height:50}}/>

        //   <BlurView
        //     style={{
        //       height: 60,
        //       position: 'absolute',
        //       bottom: 0,
        //       left: 0,
        //       right: 0,
        //       // backgroundColor:'#000'
        //     }}
        //     blurType="dark"
        //     intensity={20}
        //     overlayColor=""
        //   />
        // ),
      }}>
      <HomeTab.Screen
        name="Home"
        component={Home}
        options={{
          // headerShown: false,
          tabBarIcon: ({color, size}) => (
            <AntDesign name="home" size={size} color={color} />
          ),
          gestureEnabled: true
        }}
      />
      <HomeTab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarIcon: ({color, size}) => (
            <AntDesign name="search1" size={size} color={color} />
          ),
        }}
      />
      <HomeTab.Screen
        name="Playlists"
        component={Playlists}
        options={{
          tabBarIcon: ({size, color}) => (
            <MaterialCommunityIcons
              name="playlist-music"
              size={size}
              color={color}
            />
          ),
        }}
      />
    </HomeTab.Navigator>
  );
};

export default HomeNavigation;
