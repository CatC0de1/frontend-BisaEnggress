import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, BackHandler } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native'; // Import useRoute
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/screens';
import ConfettiCannon from 'react-native-confetti-cannon';
import ViewShot from 'react-native-view-shot';
import Header from '../components/Header';
import Toast, { useScreenshot, useConnectionErrorToast } from '../components/Toast'; // Correctly import Toast and useScreenshot
import styles from '../styles/result.style';

const ResultScreen: React.FC = () => {
  const route = useRoute(); // Access route params
  const { evaluationResult } = route.params as { evaluationResult: string }; // Extract evaluation result
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
  useConnectionErrorToast();

  return (
    <>
      <ViewShot ref={viewShotRef} options={{ format: 'png', quality: 0.9 }} style={{ flex: 1 }}>
        <View style={styles.container}>
          {showConfetti &&
            <View style={styles.confetti}>
              <ConfettiCannon count={100} origin={{ x: 0, y: 0 }} />
            </View>
          }

          <Header />

          <View style={styles.content}>
            <Text style={styles.title}>Hasil</Text>
            <View>
              <Text style={styles.contentText}>
                {evaluationResult || 'Tidak ada hasil penilaian.'} {/* Display evaluation result */}
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
