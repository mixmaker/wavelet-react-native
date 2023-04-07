import { Alert, PermissionsAndroid, ToastAndroid } from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
import { decryptByDES } from '../api';

export const requestStoragePermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      // {
      //   title: 'Storage Permission Required',
      //   message: 'Application needs access to your storage to download File',
      // },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      // Start downloading
      //   downloadFile();
      console.log('Storage Permission Granted.');
    } else {
      // If permission denied then show alert
      ToastAndroid.show(
        'Error: Storage Permission Not Granted',
        ToastAndroid.SHORT,
      );
    }
  } catch (err) {
    // To handle permission related exception
    console.log('++++' + err);
  }
};

export const downloadFile = ({ encryptedUrl, fileName }) => {
  let FILE_URL = decryptByDES(encryptedUrl);
  const { fs } = RNFetchBlob;
  let RootDir = fs.dirs.MusicDir;
  const config = {
    fileCache: true,
    appendExt: 'm4a',
    addAndroidDownloads: {
      useDownloadManager: true,
      notification: true,
      path: RootDir + '/' + fileName,
      description: 'downloading file...',
    },
  };
  RNFetchBlob.config(config)
    .fetch('GET', FILE_URL)
    .progress({ count: 10 }, (received, total) => {
      console.log('progress', received / total);
    })
    .then(res => {
      console.log('res -> ', JSON.stringify(res));
      ToastAndroid.show('File Downloaded Successfully.', ToastAndroid.SHORT);
    })
    .catch(err => console.log(err));
};
