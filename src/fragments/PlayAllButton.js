import { Pressable } from 'react-native';
import React from 'react';
import useAppContext from '../contexts/useAppContext';
import useThemeProvider from '../contexts/useThemeProvider';
import Ionicons from 'react-native-vector-icons/Ionicons';

const PlayAllButton = ({ list, createNewPlaylist }) => {
  const { playlistHandler } = useAppContext();
  const { colors } = useThemeProvider();

  return (
    <Pressable
      style={({ pressed }) => ({
        borderColor: colors.icon,
        borderWidth: 1,
        width: 35,
        height: 35,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 35 / 2,
        // paddingVertical: 5,
        // paddingHorizontal: 10,
        marginBottom: 15,
        opacity: pressed ? 0.8 : 1,
      })}
      onPress={() => {
        playlistHandler(list, createNewPlaylist);
      }}>
      <Ionicons name="play" color={colors.icon} style={{ fontSize: 19 }} />
    </Pressable>
  );
};

export default PlayAllButton;
