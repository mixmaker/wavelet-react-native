import { View, Text, ScrollView, Appearance, Animated } from 'react-native';
import React from 'react';
import useThemeProvider from '../../contexts/useThemeProvider';
import useAppContext from '../../contexts/useAppContext';
import Feather from 'react-native-vector-icons/Feather';
import { Dropdown } from 'react-native-element-dropdown';

const AppearanceSettings = ({ navigation }) => {
  const { colors, constants } = useThemeProvider();
  const { setIsDarkMode, themePref, setThemePref } = useAppContext();
  const data = [
    { label: 'Auto' },
    { label: 'Light Theme' },
    { label: 'Dark Theme' },
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
          Appearance
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
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{ color: colors.primaryText, fontSize: 16 }}>
            Theme Preference
          </Text>
          <Animated.View style={{ flex: 1 }}>
            <Dropdown
              data={data}
              labelField="label"
              valueField="label"
              value={themePref}
              style={{
                marginRight: 10,
                marginLeft: 40,
                paddingHorizontal: 2,
                paddingVertical: 4,
              }}
              selectedTextStyle={{ color: colors.secondaryText }}
              onChange={item => {
                const colorscheme = Appearance.getColorScheme() === 'dark';
                item.label === 'Auto'
                  ? setIsDarkMode(colorscheme)
                  : item.label === 'Light Theme'
                  ? setIsDarkMode(false)
                  : setIsDarkMode(true);
                setThemePref(item.label);
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
        <Text style={{ color: colors.secondaryText, marginVertical: 7 }}>
          Selecting auto will adjust the theme according to your system.
        </Text>
      </View>
    </ScrollView>
  );
};

export default AppearanceSettings;
