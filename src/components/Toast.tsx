import { useEffect, useState, useRef } from 'react';
import Toast from 'react-native-toast-message';
import RNFS from 'react-native-fs'; // React Native File Systemscreenshots

export const useConnectionErrorToast = () => {
  useEffect(() => {
    Toast.show({
      type: 'error',
      text1: 'Koneksi Internet Tidak Stabil',
      text2: 'Periksa koneksi Anda dan coba lagi.',
    });
  }, []);
};

export const useScreenshot = () => {
  const [hideButtons, setHideButtons] = useState(false);
  const viewShotRef = useRef(null); // Reference to the ViewShot component

  const takeScreenshot = () => {
    setHideButtons(true); // Hide buttons before taking screenshot

    setTimeout(() => {
      if (viewShotRef.current) {
        (viewShotRef.current as any).capture().then((uri: string) => {
          const timestamp = new Date().getTime(); // Get current timestamp
          const destPath = `${RNFS.DownloadDirectoryPath}/BisaEnggress_result_${timestamp}.png`;
          RNFS.moveFile(uri, destPath) // Move the captured screenshot to the desired path
            .then(() => {
              Toast.show({
                type: 'success',
                text1: 'Screenshot Tersimpan',
                text2: `Screenshot disimpan di ${destPath}`,
              });
            })
            .catch(err => {
              Toast.show({
                type: 'error',
                text1: 'Gagal Menyimpan Screenshot',
                text2: err.message,
              });
            })
            .finally(() => setHideButtons(false)); // Show buttons again after saving
        });
      }
    }, 1); // Delay to ensure buttons are hidden before taking screenshot
  };

  return { takeScreenshot, viewShotRef, hideButtons };
};

export default Toast;
