import { View, Text, ScrollView } from 'react-native';
import React from 'react';
import Feather from 'react-native-vector-icons/Feather';
import useThemeProvider from '../../contexts/useThemeProvider';

const GeneralSettings = ({ navigation }) => {
  const { colors, constants } = useThemeProvider();

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
          General
        </Text>
      </View>
    </ScrollView>
  );
};

export default GeneralSettings;
