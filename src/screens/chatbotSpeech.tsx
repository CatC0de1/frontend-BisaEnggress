import React, { useState, useEffect, useRef, useCallback } from 'react';
import { View, Text, TouchableOpacity, Animated, Easing, Platform, PermissionsAndroid, Linking } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/Feather';
import Icon3 from 'react-native-vector-icons/Entypo';
import Tts from 'react-native-tts'; // Import TextToSpeech API
import Voice from '@react-native-voice/voice'; // Import SpeechRecognizer
import styles from '../styles/chatbotSpeech.style';
import { useConnectionErrorToast } from '../components/Toast';
import HeaderAndModal from '../components/HeaderAndModal';

const ChatbotSpeechScreen:React.FC = () => {
  const [icon2Index, seticon2Index] = useState(0);
  const [icon3Index, setIcon3Index] = useState(0);
  const [isHolding, setIsHolding] = useState(false);
  const [isWaiting, setIsWaiting] = useState(false); // State for waiting animation
  const [isBotSpeaking, setIsBotSpeaking] = useState(false); // State for bot animation
  const blinkAnim = useRef(new Animated.Value(0)).current;

  const icons2 = ['volume', 'volume-1', 'volume-2'];
  const icons3 = ['dot-single', 'dots-two-horizontal', 'dots-three-horizontal'];

  useEffect(() => {
    const interval = setInterval(() => {
      seticon2Index((prevIndex) => (prevIndex + 1) % icons2.length);
    }, 750);
    return () => clearInterval(interval);
  }, [icons2.length]);

  useEffect(() => {
    const interval = setInterval(() => {
      setIcon3Index((prevIndex) => (prevIndex + 1) % icons3.length);
    }, 750);
    return () => clearInterval(interval);
  }, [icons3.length]);

  // Toast for connection error
  useConnectionErrorToast();

  const stopBlinking = useCallback(() => {
    blinkAnim.stopAnimation();
    blinkAnim.setValue(0);
  }, [blinkAnim]);

  useEffect(() => {
    // Initialize Voice listeners
    Voice.onSpeechStart = () => console.log('Speech started');
    Voice.onSpeechEnd = () => console.log('Speech ended');
    Voice.onSpeechError = (error) => console.error('Speech error:', error);
    Voice.onSpeechResults = (event) => {
      const text = event.value?.[0] || '';
      console.log('Recognized text:', text); // Log recognized text for debugging
      setIsWaiting(true); // Start waiting animation
      stopBlinking();
      setIsHolding(false);

      // Simulate bot response
      setTimeout(() => {
        setIsWaiting(false);
        setIsBotSpeaking(true); // Start bot animation
        Tts.speak(text); // Bot mimics the input speech
        Tts.addEventListener('tts-finish', () => {
          setIsBotSpeaking(false); // Stop bot animation
        });
      }, 2000); // Simulate processing delay
    };

    Voice.onSpeechPartialResults = (event) => {
      console.log('Partial results:', event.value); // Log partial results for debugging
    };

    return () => {
      // Clean up listeners
      Voice.destroy()
        .then(() => console.log('Voice destroyed'))
        .catch((error) => console.error('Error destroying Voice:', error));
    };
  }, [stopBlinking]);

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

  const requestMicrophonePermission = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO
      );
      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        Linking.openSettings(); // Directly open app settings if permission is denied
        return false;
      }
    }
    return true;
  };

  const startListening = async () => {
    const hasPermission = await requestMicrophonePermission();
    if (!hasPermission) {
      return;
    }

    try {
      console.log('Starting speech recognition...');
      await Voice.start('en-US'); // Start recording when button is pressed
    } catch (error) {
      console.error('Error starting Voice:', error);
    }
  };

  const stopListening = async () => {
    try {
      console.log('Stopping speech recognition...');
      if (Voice) {
        await Voice.stop(); // Stop recording when button is released
      } else {
        console.warn('Voice module is not initialized or already destroyed.');
      }
    } catch (error) {
      console.error('Error stopping Voice:', error);
    }
  };

  return (
    <View style={styles.container}>

      <HeaderAndModal />

      {/* bot */}
      {isBotSpeaking && (
        <View style={styles.botSpeech}>
          <Icon2 name={icons2[icon2Index]} size={90} color="#fff" />
        </View>
      )}
      {/* end of bot */}

      {/* waiting */}
      {isWaiting && (
        <View style={styles.progressSpeech}>
          <Icon3 name={icons3[icon3Index]} size={50} color="#fff" />
        </View>
      )}
      {/* end of waiting */}

      {/* record */}
      <Animated.View
        style={[
          styles.speechButton,
          isHolding && {
            backgroundColor: blinkAnim.interpolate({
              inputRange: [0, 1],
              outputRange: ['rgba(0, 120, 212, 1)', 'rgba(0, 120, 212, 0.6)'],
            }),
          },
        ]}
      >
        <TouchableOpacity
          style={styles.centerMic}
          activeOpacity={0.6}
          onPressIn={async () => {
            setIsHolding(true);
            startBlinking();
            await startListening(); // Start listening when button is pressed
          }}
          onPressOut={async () => {
            setIsHolding(false);
            stopBlinking();
            await stopListening(); // Stop listening when button is released
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
