import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, BackHandler } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/screens';
import ConfettiCannon from 'react-native-confetti-cannon';
import ViewShot from 'react-native-view-shot';
import Toast, { useScreenshot, useConnectionErrorToast } from '../components/Toast'; // Import useScreenshot hook
import styles from '../styles/result.style';

const ResultScreen: React.FC = () => {
  const { takeScreenshot, viewShotRef, hideButtons } = useScreenshot(); // Use the hook
  const [showConfetti, setShowConfetti] = useState(true);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    // Handle Android back button to navigate to Home
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      navigation.navigate('Home');
      return true;
    });

    // Automatically stop confetti after 5 seconds
    const time = setTimeout(() => setShowConfetti(false), 5000);

    return () => {
      backHandler.remove();
      clearTimeout(time);
    };
  }, [navigation]);

  // Toast for connection error
  // useConnectionErrorToast();

  // Toaast to take screenshot
  takeScreenshot();

  return (
    <>
      <ViewShot ref={viewShotRef} options={{ format: 'png', quality: 0.9 }} style={{ flex: 1 }}>
        <View style={styles.container}>
          {showConfetti && <ConfettiCannon count={100} origin={{ x: 0, y: 0 }} />}
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
              <Text style={styles.contentText}>
                Sepertinya Anda <Text style={styles.titleDrop}>Bisa Enggress</Text>!
              </Text>

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
