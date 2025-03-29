import React, { useEffect, useRef } from 'react';
import { View, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import styles from '../styles/splash.style';

const SplashScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial opacity is 0

  useEffect(() => {
    // Start the fade-in animation
    Animated.timing(fadeAnim, {
      toValue: 1, // Final opacity is 1
      duration: 1000,
      useNativeDriver: true,
    }).start();

    // Navigate to Home after 2 seconds
    const timer = setTimeout(() => {
      navigation.replace('Home');
    }, 2000);

    return () => clearTimeout(timer); // Cleanup the timer
  }, [fadeAnim, navigation]);

  return (
    <View style={styles.container}>
      <Animated.Text style={[styles.text, { opacity: fadeAnim }]}>
        Latihlah bahasa Inggrismu dengan
      </Animated.Text>
      <Animated.Text style={[styles.highlight, { opacity: fadeAnim }]}>
        Bisa Enggress
      </Animated.Text>
    </View>
  );
};

export default SplashScreen;
