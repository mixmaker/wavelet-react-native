import { View, Text, Pressable, ScrollView } from 'react-native';
import React, { useState } from 'react';
import useAppContext from '../../contexts/useAppContext';
import useThemeProvider from '../../contexts/useThemeProvider';
import Feather from 'react-native-vector-icons/Feather';
import { Dropdown } from 'react-native-element-dropdown';
import Animated from 'react-native-reanimated';

const AudioPlayerSettings = ({ navigation }) => {
  const { colors, constants } = useThemeProvider();
  const {
    audioQuality,
    setAudioQuality,
    playerAnimationType,
    setPlayerAnimationType,
  } = useAppContext();
  const [focus, setFocus] = useState(false);
  const audioQData = [
    { label: 'Low', quality: 48 },
    { label: 'Basic', quality: 96 },
    { label: 'Normal', quality: 160 },
    { label: 'High', quality: 320 },
  ];
  const playerAnData = [
    { name: 'Classic' },
    { name: 'iOS Modal Type' },
    { name: 'Reveal from Bottom' },
  ];
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ flexGrow: 1 }}
      style={{
        paddingVertical: constants.statusbarHeight + 20,
        backgroundColor: colors.primarybg,
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginHorizontal: 20,
        }}>
        <Feather
          name="arrow-left"
          size={24}
          color={colors.secondaryText}
          style={{ marginRight: 20, paddingTop: 5 }}
          onPress={() => navigation.goBack()}
        />
        <Text
          style={{
            fontSize: 32,
            color: colors.secondaryText,
          }}>
          Audio & Player
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
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{ color: colors.primaryText, fontSize: 16 }}>
            Audio Quality
          </Text>
          <Animated.View style={{ flex: 1 }}>
            <Dropdown
              data={audioQData}
              labelField="label"
              valueField="quality"
              value={audioQuality}
              style={{
                marginRight: 10,
                marginLeft: 40,
                paddingHorizontal: 2,
                paddingVertical: 4,
              }}
              selectedTextStyle={{ color: colors.secondaryText }}
              onChange={item => {
                setAudioQuality(item.quality);
              }}
              activeColor={colors.secondarybg}
              containerStyle={{
                // backgroundColor: '#1b1b1bef',
                borderWidth: 0,
                borderRadius: 10,
                padding: 5,
                backgroundColor: colors.primarybg,
              }}
              itemTextStyle={{ color: colors.primaryText }}
              itemContainerStyle={{
                borderRadius: 10,
                backgroundColor: colors.primarybg,
              }}
            />
          </Animated.View>
        </View>
        <Text
          style={{
            color: colors.secondaryText,
            marginVertical: 7,
            lineHeight: 20,
          }}>
          Higher audio quality will consume more data. It may also take longer
          to load on slow networks. {'\n'}Changing this setting will apply to
          the songs you play next.
        </Text>
      </View>
      <View
        style={{
          marginHorizontal: 20,
          marginTop: 25,
          borderBottomColor: colors.secondaryText,
          borderBottomWidth: 0.5,
          paddingBottom: 5,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{ color: colors.primaryText, fontSize: 16 }}>
            Player Screen Animation
          </Text>
          <Animated.View style={{ flex: 1 }}>
            <Dropdown
              data={playerAnData}
              labelField="name"
              valueField="name"
              value={playerAnimationType}
              style={{
                marginRight: 10,
                marginLeft: 40,
                paddingHorizontal: 2,
                paddingVertical: 4,
              }}
              selectedTextStyle={{ color: colors.secondaryText }}
              onChange={item => {
                setPlayerAnimationType(item.name);
              }}
              activeColor={colors.secondarybg}
              containerStyle={{
                // backgroundColor: '#1b1b1bef',
                borderWidth: 0,
                borderRadius: 10,
                padding: 5,
                backgroundColor: colors.primarybg,
              }}
              itemTextStyle={{ color: colors.primaryText }}
              itemContainerStyle={{
                borderRadius: 10,
                backgroundColor: colors.primarybg,
              }}
            />
          </Animated.View>
        </View>
        <Text
          style={{
            color: colors.secondaryText,
            marginVertical: 7,
            lineHeight: 20,
          }}>
          Change how the full screen player behaves.
        </Text>
      </View>
    </ScrollView>
  );
};

export default AudioPlayerSettings;
