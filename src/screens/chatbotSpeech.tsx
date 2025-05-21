import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Animated, Easing, Platform } from 'react-native';
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import FontAwesome icons
import Icon2 from 'react-native-vector-icons/Feather';
import Icon3 from 'react-native-vector-icons/Entypo';
import styles from '../styles/chatbotSpeech.style';
import { useConnectionErrorToast } from '../components/Toast'; // Import the hook
import HeaderAndModal from '../components/HeaderAndModal';

const ChatbotSpeechScreen: React.FC = () => {

  const [icon2Index, seticon2Index] = useState(0);
  const [icon3Index, setIcon3Index] = useState(0);
  const [isHolding, setIsHolding] = useState(false); // State to track button hold
  const blinkAnim = useRef(new Animated.Value(0)).current; // Animation value

  const icons2 = ['volume', 'volume-1', 'volume-2'];
  const icons3 = ['dot-single', 'dots-two-horizontal', 'dots-three-horizontal'];

  useEffect(() => {
    const interval = setInterval(() => {
      seticon2Index((prevIndex) => (prevIndex + 1) % icons2.length);
    }, 750); // Change Icon2 every 750ms
    return () => clearInterval(interval);
  }, [icons2.length]);

  useEffect(() => {
    const interval = setInterval(() => {
      setIcon3Index((prevIndex) => (prevIndex + 1) % icons3.length);
    }, 750); // Change Icon3 every 750ms
    return () => clearInterval(interval);
  }, [icons3.length]);

  useEffect(() => {
    // Minta izin mikrofon saat komponen mount
    const requestMicPermission = async () => {
      try {
        const result = await request(
          Platform.OS === 'android'
            ? PERMISSIONS.ANDROID.RECORD_AUDIO
            : PERMISSIONS.IOS.MICROPHONE
        );
        if (result !== RESULTS.GRANTED) {
          // Handle jika izin tidak diberikan
          console.warn('Izin mikrofon tidak diberikan');
        }
      } catch (error) {
        console.warn('Gagal meminta izin mikrofon:', error);
      }
    };

    requestMicPermission();
  }, []);

  // Toast for connection error
  useConnectionErrorToast();

  const startBlinking = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(blinkAnim, {
          toValue: 1,
          duration: 750,
          easing: Easing.linear,
          useNativeDriver: false,
        }),
        Animated.timing(blinkAnim, {
          toValue: 0,
          duration: 750,
          easing: Easing.linear,
          useNativeDriver: false,
        }),
      ])
    ).start();
  };

  const stopBlinking = () => {
    blinkAnim.stopAnimation();
    blinkAnim.setValue(0); // Reset animation
  };

  return (
    <View style={styles.container}>

      <HeaderAndModal />

      {/* bot */}
      {/* <View style={styles.botSpeech}>
        <Icon2 name={icons2[icon2Index]} size={90} color="#fff" />
      </View> */}
      {/* end of bot */}

      {/* waiting */}
      {/* <View style={styles.progressSpeech}>
        <Icon3 name={icons3[icon3Index]} size={50} color="#fff" />
      </View> */}
      {/* end of waiting */}

      {/* record */}
      <Animated.View
        style={[
          styles.speechButton,
          isHolding && {
            backgroundColor: blinkAnim.interpolate({
              inputRange: [0, 1],
              outputRange: ['rgba(0, 120, 212, 1)', 'rgba(0, 120, 212, 0.6)'], // Blinking colors for the button
            }),
          },
        ]}
      >
        <TouchableOpacity
          style={styles.centerMic}
          activeOpacity={0.6}
          onPressIn={() => {
            setIsHolding(true);
            startBlinking();
          }}
          onPressOut={() => {
            setIsHolding(false);
            stopBlinking();
          }}
        >
          <Icon name="microphone" size={75} color="#fff" />
          <Text style={styles.speechButtonText}>Tahan untuk bicara</Text>
        </TouchableOpacity>
      </Animated.View>
      {/* end of record */}

    </View>
  );
};

export default ChatbotSpeechScreen;
