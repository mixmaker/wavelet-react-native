import { ScrollView, View, Text, Pressable } from 'react-native';
import React from 'react';
import useThemeProvider from '../contexts/useThemeProvider';
import Entypo from 'react-native-vector-icons/Entypo';
import useAppContext from '../contexts/useAppContext';

const Settings = ({ navigation }) => {
  const { colors, constants } = useThemeProvider();
  const { audioQuality, setAudioQuality } = useAppContext();
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
      <Text
        style={{
          fontSize: 32,
          marginLeft: 20,
          color: colors.secondaryText,
          marginTop: 15,
        }}>
        Settings
      </Text>
      <View
        style={{
          marginHorizontal: 15,
          marginTop: 15,
          borderBottomColor: colors.secondaryText,
          borderBottomWidth: 0.5,
          paddingBottom: 10,
        }}>
        <Text
          style={{
            fontWeight: '700',
            fontSize: 18,
            color: colors.primaryText,
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
            key={i}
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
        <Text style={{ color: colors.secondaryText, marginVertical: 10 }}>
          Higher audio quality will consume more data. It may also take longer
          to load on slow networks.
        </Text>
        {/* <View>

        </View> */}
      </View>
    </ScrollView>
  );
};

export default Settings;
