import React, { Component, useState } from 'react';
import { Dimensions, Modal, StyleSheet, View, Text } from 'react-native';
import CodePush from 'react-native-code-push';
// import { Icon, Text } from "react-native-elements";
import Animated, { Layout } from 'react-native-reanimated';
import AntDesign from 'react-native-vector-icons/AntDesign';

class CodePushManager extends Component {
  overlayWidth = Dimensions.get('window').width - 40;
  state = {
    stat: 0,
    downloadProgress: 0,
  };

  codePushStatusDidChange(status) {
    // eslint-disable-next-line default-case
    switch (status) {
      case CodePush.SyncStatus.CHECKING_FOR_UPDATE:
        console.log('Checking for updates.');
        break;
      case CodePush.SyncStatus.DOWNLOADING_PACKAGE:
        this.setState({ stat: 1 });
        console.log('Downloading package.');
        break;
      case CodePush.SyncStatus.INSTALLING_UPDATE:
        console.log('Installing update.');
        break;
      case CodePush.SyncStatus.UP_TO_DATE:
        console.log('Up-to-date.');
        break;
      case CodePush.SyncStatus.UPDATE_INSTALLED:
        console.log('Update installed.');
        this.setState({ stat: 2 });
        setTimeout(() => {
          CodePush.restartApp();
        }, 2000);
        break;
    }
  }

  codePushDownloadDidProgress(progress) {
    this.setState({
      downloadProgress: Math.floor(
        (progress.receivedBytes / progress.totalBytes) * 100,
      ),
    });
  }

  render() {
    const { stat, downloadProgress } = this.state;

    return (
      <Modal
        transparent
        animationType={'slide'}
        visible={stat > 0}
        onDismiss={() => this.setState({ stat: 0 })}>
        <View style={styles.overlay}>
          <Animated.View layout={Layout} style={styles.wrapper}>
            {stat === 1 ? (
              <View
                style={[styles.progressOuter, { width: this.overlayWidth }]}>
                <View
                  style={{
                    height: 5,
                    width: downloadProgress + '%',
                    backgroundColor: 'purple',
                  }}
                />
              </View>
            ) : (
              <View style={styles.uploadedText}>
                <AntDesign name="checkcircle" color="green" size={24} />
                <Text style={styles.text}>{'Downloaded, restarting...'}</Text>
              </View>
            )}
          </Animated.View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  overlay: {
    paddingHorizontal: 20,
    position: 'absolute',
    bottom: 50,
    width: '100%',
    flex: 1,
    alignItems: 'center',
  },
  wrapper: {
    height: 40,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',

    borderRadius: 20,
    backgroundColor: 'white',
    padding: 20,
    paddingHorizontal: 10,
    elevation: 5,
    shadowColor: 'black',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: {
      width: 2,
      height: 2,
    },
  },
  progressOuter: {
    height: 5,
    backgroundColor: 'lightgray',
  },
  uploadedText: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
  },
  text: {
    fontSize: 14,
    marginLeft: 5,
    color: '#111',
  },
});
// export default CodePush({
//   checkFrequency: __DEV__ ? CodePush.CheckFrequency.MANUAL : CodePush.CheckFrequency.ON_APP_RESUME,
//   installMode: CodePush.InstallMode.ON_NEXT_RESTART,
//   mandatoryInstallMode: CodePush.InstallMode.ON_NEXT_RESTART,
//   updateDialog: true,
//   })(CodePushManager);

// import { View, Text } from 'react-native';
// import React from 'react';

// const CodePushManager = () => {
//   const overlayWidth = Dimensions.get('window').width - 40;
//   const [stat, setStat] = useState(0);
//   const [downloadProgress, setDownloadProgress] = useState(0);

//   const codePushStatusDidChange = status => {
//     // eslint-disable-next-line default-case
//     switch (status) {
//       case CodePush.SyncStatus.CHECKING_FOR_UPDATE:
//         console.log('Checking for updates.');
//         break;
//       case CodePush.SyncStatus.DOWNLOADING_PACKAGE:
//         setStat(1);
//         console.log('Downloading package.');
//         break;
//       case CodePush.SyncStatus.INSTALLING_UPDATE:
//         console.log('Installing update.');
//         break;
//       case CodePush.SyncStatus.UP_TO_DATE:
//         console.log('Up-to-date.');
//         break;
//       case CodePush.SyncStatus.UPDATE_INSTALLED:
//         console.log('Update installed.');
//         setStat(2);
//         setTimeout(() => {
//           CodePush.restartApp();
//         }, 2000);
//         break;
//     }
//   };

//   const codePushDownloadDidProgress = progress => {
//     setDownloadProgress(
//       Math.floor((progress.receivedBytes / progress.totalBytes) * 100),
//     );
//   };
//   return (
//     <Modal
//       transparent
//       animationType={'slide'}
//       visible={stat > 0}
//       onDismiss={() => this.setState({ stat: 0 })}>
//       <View style={styles.overlay}>
//         <Animated.View layout={Layout} style={styles.wrapper}>
//           {stat === 1 ? (
//             <View style={[styles.progressOuter, { width: this.overlayWidth }]}>
//               <View
//                 style={{
//                   height: 5,
//                   width: downloadProgress + '%',
//                   backgroundColor: 'purple',
//                 }}
//               />
//             </View>
//           ) : (
//             <View style={styles.uploadedText}>
//               <AntDesign name="checkcircle" color="green" size={24} />
//               <Text style={styles.text}>{'Downloaded, restarting...'}</Text>
//             </View>
//           )}
//         </Animated.View>
//       </View>
//     </Modal>
//   );
// };

export default CodePush(CodePushManager);
