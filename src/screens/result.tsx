import React, {useEffect, useState, useRef} from 'react';
import {View, Text, TouchableOpacity, BackHandler, Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../App'; // Import the ParamList type
import ConfettiCannon from 'react-native-confetti-cannon'; // Import confetti cannon
import ViewShot from 'react-native-view-shot'; // Import ViewShot for screenshots
import RNFS from 'react-native-fs'; // Import RNFS for file handling
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

  const takeScreenshot = () => {
    setHideButtons(true); // Hide buttons before taking the screenshot
    setTimeout(() => {
      if (viewShotRef.current) {
        (viewShotRef.current as any).capture().then((uri: string) => {
          const destPath = `${RNFS.DownloadDirectoryPath}/result_screenshot.png`;
          RNFS.moveFile(uri, destPath)
            .then(() => {
              Alert.alert('Screenshot Tersimpan', `Screenshot disimpan di ${destPath}`);
            })
            .catch(err => {
              Alert.alert('Gagal Menyimpan Screenshot', err.message);
            })
            .finally(() => setHideButtons(false)); // Show buttons again after saving
        });
      }
    }, 100); // Delay to ensure buttons are hidden before capturing
  };

  return (
    <ViewShot ref={viewShotRef} options={{format: 'png', quality: 0.9}} style={{flex: 1}}>
      <View style={styles.container}>
        {showConfetti && <ConfettiCannon count={100} origin={{x: 0, y: 0}} />}
        <Text style={styles.header}>Bisa Enggress</Text>
        <View style={styles.content}>
          <Text style={styles.title}>Hasil</Text>
          <Text style={styles.contentText}>
            Selamat! Anda telah menyelesaikan percakapan. Nilai kemampuan bahasa
            Inggris Anda adalah 85/100.
            Sepertinya Anda bisa Enggress!
          </Text>
          {!hideButtons && ( // Conditionally render buttons
            <View style={styles.actionsButtons}>
              <TouchableOpacity style={styles.button} onPress={takeScreenshot}>
                <Text style={styles.buttonText}>Screenshot</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Home')}>
                <Text style={styles.buttonText}>Home</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </ViewShot>
  );
};

export default ResultScreen;
