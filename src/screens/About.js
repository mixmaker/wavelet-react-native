import {
  ScrollView,
  View,
  Text,
  Image,
  Pressable,
  Linking,
} from 'react-native';
import React from 'react';
import useThemeProvider from '../contexts/useThemeProvider';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import { version } from '../../package.json';

const About = ({ navigation }) => {
  const { colors, constants } = useThemeProvider();
  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      style={{
        paddingTop: constants.statusbarHeight + 20,
        paddingBottom: constants.navbarHeight,
        backgroundColor: colors.primarybg,
      }}>
      <View
        style={{
          flex: 1,
          justifyContent: 'space-evenly',
          marginHorizontal: 20,
        }}>
        <View>
          <Image
            source={require('../assets/logo.png')}
            style={{
              height: 100,
              width: 100,
              alignSelf: 'center',
              marginBottom: 10,
            }}
            resizeMode="cover"
          />
          <Text
            style={{
              fontSize: 42,
              marginLeft: 12,
              color: colors.primaryText,
              fontWeight: '600',
              textAlign: 'center',
            }}>
            Wavelet
          </Text>
          <Text style={{ textAlign: 'center', fontSize: 16 }}>{version}</Text>
        </View>
        <View style={{ alignItems: 'center' }}>
          <Text style={{ textAlign: 'center', fontSize: 18 }}>
            This is an open source project and can be found on GitHub
          </Text>
          <Pressable
            onPress={() =>
              Linking.openURL(
                'https://github.com/mixmaker/wavelet-react-native',
              ).catch(err => console.error('An error occurred', err))
            }
            style={({ pressed }) => ({
              marginTop: 15,
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: pressed ? colors.primarybg : colors.secondarybg,
              alignSelf: 'center',
              paddingHorizontal: 15,
              paddingVertical: 10,
              borderRadius: 6,
            })}>
            <AntDesign
              name="github"
              size={18}
              color={colors.primaryText}
              style={{ marginRight: 8 }}
            />
            <Text style={{ fontSize: 18, color: colors.primaryText }}>
              GitHub repo
            </Text>
          </Pressable>
        </View>
        <View>
          <Text
            style={{
              fontSize: 18,
              textAlign: 'center',
              color: colors.secondaryText,
            }}>
            If you liked my work, show some love and ⭐ the repo
          </Text>
          <Pressable
            onPress={() =>
              Linking.openURL('https://www.buymeacoffee.com/shoumik').catch(
                err => console.error('An error occurred', err),
              )
            }
            style={({ pressed }) => ({
              marginTop: 15,
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: '#FFDD00',
              alignSelf: 'center',
              paddingHorizontal: 15,
              paddingVertical: 10,
              borderRadius: 6,
              transform: [{ scale: pressed ? 0.98 : 1 }],
            })}>
            <>
              <Feather
                name="coffee"
                size={20}
                color={'#111'}
                style={{ marginRight: 8 }}
              />
              <Text
                style={{
                  fontSize: 18,
                  color: '#111',
                }}>
                Buy me a coffee
              </Text>
            </>
          </Pressable>
        </View>
      </View>
      <Text
        style={{
          color: colors.secondaryText,
          marginBottom: 30,
          textAlign: 'center',
          fontSize: 15,
        }}>
        Made with ♥ by Shoumik Kumbhakar
      </Text>
    </ScrollView>
  );
};

export default About;
