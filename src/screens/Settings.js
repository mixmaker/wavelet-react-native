import { ScrollView, View, Text, Pressable, Appearance } from 'react-native';
import React, { useEffect, useState } from 'react';
import useThemeProvider from '../contexts/useThemeProvider';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import useAppContext from '../contexts/useAppContext';
import { createStackNavigator } from '@react-navigation/stack';
import CustomText from '../fragments/CustomText';

const Settingss = ({ navigation }) => {
  const { colors, constants } = useThemeProvider();
  const {
    audioQuality,
    setAudioQuality,
    setIsDarkMode,
    playerAnimationType,
    setPlayerAnimationType,
  } = useAppContext();
  const [themePref, setThemePref] = useState('Auto');

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ flexGrow: 1 }}
      style={{
        paddingVertical: constants.statusbarHeight + 20,
        backgroundColor: colors.primarybg,
      }}>
      {/* <Entypo
        name="menu"
        size={24}
        color={colors.primaryText}
        style={{ marginLeft: 15 }}
        onPress={() => {
          navigation?.openDrawer();
        }}
      /> */}
      <Text
        style={{
          fontSize: 32,
          marginLeft: 20,
          color: colors.secondaryText,
          // marginTop: 15,
        }}>
        Settings
      </Text>
      <View
        style={{
          marginHorizontal: 20,
          marginTop: 15,
          borderBottomColor: colors.secondaryText,
          borderBottomWidth: 0.5,
          paddingBottom: 5,
        }}>
        <Text
          bold
          style={{
            fontSize: 18,
            color: colors.primaryText,
            left: -8,
          }}>
          Theme Preference
        </Text>
        {[
          { name: 'Auto' },
          { name: 'Light Theme' },
          { name: 'Dark Theme' },
        ].map((item, i) => (
          <Pressable
            key={i.toString()}
            style={({ pressed }) => ({
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              transform: [{ scale: pressed ? 0.99 : 1 }],
              marginTop: 14,
            })}
            onPress={() => {
              const colorscheme = Appearance.getColorScheme() === 'dark';
              item.name === 'Auto'
                ? setIsDarkMode(colorscheme)
                : item.name === 'Light Theme'
                ? setIsDarkMode(false)
                : setIsDarkMode(true);
              setThemePref(item.name);
            }}>
            <View>
              <Text style={{ color: colors.primaryText, fontSize: 16 }}>
                {item.name}
              </Text>
            </View>
            {themePref === item.name && (
              <Entypo
                name="check"
                size={24}
                color="#48c58b"
                style={{ marginLeft: 15 }}
                onPress={() => {
                  navigation?.openDrawer();
                }}
              />
            )}
          </Pressable>
        ))}
        <Text style={{ color: colors.secondaryText, marginVertical: 7 }}>
          Selecting auto will adjust the theme according to your system.
        </Text>
      </View>
      <View
        style={{
          marginHorizontal: 20,
          marginTop: 20,
          borderBottomColor: colors.secondaryText,
          borderBottomWidth: 0.5,
          paddingBottom: 5,
        }}>
        <Text
          style={{
            fontWeight: '700',
            fontSize: 18,
            color: colors.primaryText,
            left: -8,
          }}>
          Audio Quality
        </Text>
        {[
          { name: 'Low', quality: 48 },
          { name: 'Basic', quality: 96 },
          { name: 'Normal', quality: 160 },
          { name: 'High', quality: 320 },
        ].map((item, i) => (
          <Pressable
            key={i.toString()}
            style={({ pressed }) => ({
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              transform: [{ scale: pressed ? 0.99 : 1 }],
              marginTop: 14,
            })}
            onPress={() => setAudioQuality(item.quality)}>
            <View>
              <Text style={{ color: colors.primaryText, fontSize: 16 }}>
                {item.name}
              </Text>
              <Text style={{ color: colors.secondaryText, fontSize: 15 }}>
                {item.quality} Kbps,{' '}
                {(((item.quality / 8) * 60) / 1024).toFixed(2)} MB per minute
              </Text>
            </View>
            {audioQuality === item.quality && (
              <Entypo
                name="check"
                size={24}
                color="#48c58b"
                style={{ marginLeft: 15 }}
                onPress={() => {
                  navigation?.openDrawer();
                }}
              />
            )}
          </Pressable>
        ))}
        <Text style={{ color: colors.secondaryText, marginVertical: 7 }}>
          Higher audio quality will consume more data. It may also take longer
          to load on slow networks. {'\n'}Changing this setting will apply to
          the songs you play next.
        </Text>
      </View>
      {/*<View
        style={{
          marginHorizontal: 20,
          marginTop: 15,
          borderBottomColor: colors.secondaryText,
          borderBottomWidth: 0.5,
          paddingBottom: 5,
        }}>
        <Text
          style={{
            fontWeight: '700',
            fontSize: 18,
            color: colors.primaryText,
            left: -8,
          }}>
          Player Screen Animation
        </Text>
        {[
          { name: 'Classic' },
          { name: 'iOS Modal Type' },
          { name: 'Reveal from Bottom' },
        ].map((item, i) => (
          <Pressable
            key={i.toString()}
            style={({ pressed }) => ({
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              transform: [{ scale: pressed ? 0.99 : 1 }],
              marginTop: 14,
            })}
            onPress={() => setPlayerAnimationType(item.name)}>
            <View>
              <Text style={{ color: colors.primaryText, fontSize: 16 }}>
                {item.name}
              </Text>
            </View>
            {playerAnimationType === item.name && (
              <Entypo
                name="check"
                size={24}
                color="#48c58b"
                style={{ marginLeft: 15 }}
                onPress={() => {
                  navigation?.openDrawer();
                }}
              />
            )}
          </Pressable>
        ))}
      </View>*/}
    </ScrollView>
  );
};

const Settings = ({ navigation }) => {
  const { colors, constants } = useThemeProvider();
  const {
    audioQuality,
    setAudioQuality,
    setIsDarkMode,
    playerAnimationType,
    setPlayerAnimationType,
  } = useAppContext();
  const [themePref, setThemePref] = useState('Auto');
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ flexGrow: 1 }}
      style={{
        paddingVertical: constants.statusbarHeight + 20,
        backgroundColor: colors.primarybg,
      }}>
      <CustomText
        style={{
          fontSize: 32,
          marginLeft: 20,
          color: colors.secondaryText,
          // marginTop: 15,
        }}>
        Settings
      </CustomText>
      <View style={{ margin: 20 }}>
        <Pressable
          style={{ marginVertical: 10, flexDirection: 'row' }}
          onPress={() => navigation.navigate('AppearanceSettings')}>
          <Ionicons
            name="color-palette"
            size={24}
            color={colors.secondaryText}
            style={{ marginRight: 8 }}
          />
          <CustomText
            semiBold
            style={{
              color: colors.primaryText,
              fontSize: 18,
              alignItems: 'center',
            }}>
            Appearance
          </CustomText>
        </Pressable>
        <Pressable
          style={{
            marginVertical: 10,
            flexDirection: 'row',
            alignItems: 'center',
          }}
          onPress={() => navigation.navigate('GeneralSettings')}>
          <MaterialCommunityIcons
            name="shape"
            size={24}
            color={colors.secondaryText}
            style={{ marginRight: 8 }}
          />
          <CustomText
            semiBold
            style={{ color: colors.primaryText, fontSize: 18 }}>
            General
          </CustomText>
        </Pressable>
        <Pressable
          style={{
            marginVertical: 10,
            flexDirection: 'row',
            alignItems: 'center',
          }}
          onPress={() => navigation.navigate('AudioPlayerSettings')}>
          <Ionicons
            name="play"
            size={24}
            color={colors.secondaryText}
            style={{ marginRight: 8 }}
          />
          <CustomText
            semiBold
            style={{ color: colors.primaryText, fontSize: 18 }}>
            Audio & Player
          </CustomText>
        </Pressable>
        <Pressable
          style={{
            marginVertical: 10,
            flexDirection: 'row',
            alignItems: 'center',
          }}
          onPress={() => navigation.navigate('About')}>
          <Entypo
            name="info-with-circle"
            size={24}
            color={colors.secondaryText}
            style={{ marginRight: 8 }}
          />
          <CustomText
            semiBold
            style={{ color: colors.primaryText, fontSize: 18 }}>
            About
          </CustomText>
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default Settings;
