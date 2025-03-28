import React, {useEffect, useState, useRef} from 'react';
import {View, Text, TouchableOpacity, BackHandler} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import { RootStackParamList } from '../components/dataType';
import ConfettiCannon from 'react-native-confetti-cannon'; // Import confetti cannon
import ViewShot from 'react-native-view-shot'; // Import ViewShot for screenshots
import RNFS from 'react-native-fs'; // Import RNFS for file handling
import Toast from 'react-native-toast-message'; // Import Toast for notifications
import { useConnectionErrorToast } from '../components/ConnectionToast'; // Import the hook
import styles from '../styles/result.style';

const ResultScreen: React.FC = () => {
  const [showConfetti, setShowConfetti] = useState(true);
  const [hideButtons, setHideButtons] = useState(false); // State to hide buttons during screenshot
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const viewShotRef = useRef(null); // Reference for ViewShot

  useEffect(() => {
    // Handle Android back button to navigate to Home
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      navigation.navigate('Home');
      return true; // Prevent default back behavior
    });

    // Automatically stop confetti after 5 seconds
    const timer = setTimeout(() => setShowConfetti(false), 5000);

    return () => {
      backHandler.remove();
      clearTimeout(timer);
    };
  }, [navigation]);

  // Toast for connection error
  // useConnectionErrorToast();

  const takeScreenshot = () => {
    setHideButtons(true); // Hide buttons before taking the screenshot
    setTimeout(() => {
      if (viewShotRef.current) {
        (viewShotRef.current as any).capture().then((uri: string) => {
          const timestamp = new Date().getTime(); // Generate a unique timestamp
          const destPath = `${RNFS.DownloadDirectoryPath}/BisaEnggress_result_${timestamp}.png`; // Add timestamp to file name
          RNFS.moveFile(uri, destPath)
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
    }, 1); // Delay to ensure buttons are hidden before capturing
  };

  return (
    <>
      <ViewShot ref={viewShotRef} options={{format: 'png', quality: 0.9}} style={{flex: 1}}>
        <View style={styles.container}>
          {showConfetti && <ConfettiCannon count={100} origin={{x: 0, y: 0}} />}
          <Text style={styles.header}>Bisa Enggress</Text>
          <View style={styles.content}>
            <Text style={styles.title}>Hasil</Text>
            <View>

              {/* sample prompt result */}
              <Text style={styles.contentText}>
                Bahasa Inggris Anda cukup mudah dipahami walau terkadang terdapat kesalahan grammar.
              </Text>
              <Text style={styles.nilaiContent}>
                Grammar    : <Text style={styles.nilai}>75% (cukup bagus)</Text>
              </Text>
              <Text style={styles.nilaiContent}>
                Vocabulary : <Text style={styles.nilai}>85% (bagus)</Text>
              </Text>
              <Text style={styles.contentText}>Sepertinya Anda <Text style={styles.titleDrop}>Bisa Enggress</Text>!</Text>

            </View>
            {!hideButtons && (
              <View style={styles.actionsButtons}>
                <TouchableOpacity style={styles.button} activeOpacity={0.6} onPress={takeScreenshot}>
                  <Text style={styles.buttonText}>Screenshot</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} activeOpacity={0.6} onPress={() => navigation.navigate('Home')}>
                  <Text style={styles.buttonText}>Home</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </ViewShot>
      <Toast />
    </>
  );
};

export default ResultScreen;
