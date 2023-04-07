import React, { useState, useCallback, useEffect } from 'react';
import { BackHandler, ToastAndroid } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

const useDoublePressToExit = (onBeforeCloseApp, customFunction) => {
  const [backPressedCount, setBackPressedCount] = useState(0);

  useFocusEffect(
    useCallback(() => {
      const sub = BackHandler.addEventListener('hardwareBackPress', () => {
        if (onBeforeCloseApp) {
          onBeforeCloseApp(() => setBackPressedCount(2));
        } else {
          setBackPressedCount(pre => {
            if (pre === 0) {
              ToastAndroid.show('Press again to exit', 1000);
              setTimeout(() => setBackPressedCount(0), 1000);
            }
            return pre + 1;
          });
        }
        return true;
      });
      return sub.remove;
    }, [onBeforeCloseApp]),
  );

  useEffect(() => {
    if (backPressedCount === 2) {
      customFunction && customFunction();
      BackHandler.exitApp();
    }
  }, [backPressedCount]);

  return {
    closeApp: () => setBackPressedCount(2),
  };
};
export default useDoublePressToExit;
