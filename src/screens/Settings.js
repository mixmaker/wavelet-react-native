import { ScrollView, View, Text } from 'react-native';
import React from 'react';
import useThemeProvider from '../contexts/useThemeProvider';
import Entypo from 'react-native-vector-icons/Entypo';

const Settings = ({ navigation }) => {
  const { colors, constants } = useThemeProvider();
  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      style={{
        paddingTop: constants.statusbarHeight + 20,
        backgroundColor: colors.primarybg,
      }}>
      <Entypo
        name="menu"
        size={24}
        color={colors.primaryText}
        style={{ marginLeft: 15 }}
        onPress={() => {
          navigation?.openDrawer();
        }}
      />
      <Text>Settings</Text>
    </ScrollView>
  );
};

export default Settings;
