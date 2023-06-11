import { Pressable } from 'react-native';
import React from 'react';
import useAppContext from '../contexts/useAppContext';
import useThemeProvider from '../contexts/useThemeProvider';
import CustomText from './CustomText';

const PlayAllButton = ({ list, createNewPlaylist }) => {
  const { playlistHandler } = useAppContext();
  const { colors } = useThemeProvider();

  return (
    <Pressable
      style={({ pressed }) => ({
        borderColor: colors.icon,
        borderWidth: 1,
        width: 80,
        alignItems: 'center',
        borderRadius: 8,
        paddingVertical: 5,
        paddingHorizontal: 10,
        marginBottom: 15,
        opacity: pressed ? 0.8 : 1,
      })}
      onPress={() => {
        playlistHandler(list, createNewPlaylist);
      }}>
      <CustomText style={{ fontSize: 16, color: colors.primaryText }}>Play all</CustomText>
    </Pressable>
  );
};

export default PlayAllButton;
