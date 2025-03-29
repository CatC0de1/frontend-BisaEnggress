import React, {useState, useEffect, useRef} from 'react';
import {View, Text, TouchableOpacity, Pressable, Modal, Animated, Easing, BackHandler} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import FontAwesome icons
import Icon2 from 'react-native-vector-icons/Feather';
import Icon3 from 'react-native-vector-icons/Entypo';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../components/dataType';
import styles from '../styles/chatbotSpeech.style';
import { useConnectionErrorToast } from '../components/ConnectionToast'; // Import the hook

const ChatbotSpeechScreen: React.FC = () => {

  const [modalVisible, setModalVisible] = useState<'kembali' | 'nilai' | null>(null);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
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
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      setModalVisible('kembali'); // Show "kembali" modal
      return true; // Prevent default back behavior
    });

    return () => backHandler.remove(); // Cleanup on unmount
  }, []);

  // Toast for connection error
  // useConnectionErrorToast();

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
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Bisa Enggress</Text>
        <View style={styles.actionButtons}>
          <Pressable
            onPress={() => setModalVisible('kembali')}
            style={({ pressed }) => [
              styles.button,
              pressed ? styles.buttonActive : null, // Use null instead of false
            ]}
          >
            {({ pressed }) => ( // Pass pressed state to the Text component
              <Text style={[
                styles.buttonText,
                pressed ? styles.buttonTextActive : null, // Change text color when pressed
              ]}>
                Kembali
              </Text>
            )}
          </Pressable>
          <Pressable
            onPress={() => setModalVisible('nilai')}
            style={({ pressed }) => [
              styles.button,
              pressed ? styles.buttonActive : null, // Use null instead of false
            ]}
          >
            {({ pressed }) => ( // Pass pressed state to the Text component
              <Text style={[
                styles.buttonText,
                pressed ? styles.buttonTextActive : null, // Change text color when pressed
              ]}>
                Nilai
              </Text>
            )}
          </Pressable>
        </View>
      </View>

      {/* bot */}
      {/* <View style={styles.botSpeech}>
        <Icon2 name={icons2[icon2Index]} size={90} color="#fff" />
      </View> */}

      {/* waiting */}
      {/* <View style={styles.progressSpeech}>
        <Icon3 name={icons3[icon3Index]} size={50} color="#fff" />
      </View> */}

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


      {/* Modal */}
      <Modal visible={modalVisible === 'kembali'} transparent animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Ingin keluar dari percakapan?</Text>
            <Text style={styles.modalText}>Percakapan akan hilang setelah keluar!</Text>
            <View style={styles.actionButtonsModal}>
              <TouchableOpacity style={styles.modalButton1} onPress={() => setModalVisible(null)}>
                <Text style={styles.modalButtonText}>Tidak</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalButton2}
                onPress={() => {
                  setModalVisible(null);
                  navigation.navigate('Home');
                }}>
                <Text style={styles.modalButtonText}>Ya</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Modal visible={modalVisible === 'nilai'} transparent animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Ingin menyudahi percakapan lalu melihat nilai kemampuan bahasa Inggrismu?</Text>
            <View style={styles.actionButtonsModal}>
              <TouchableOpacity style={styles.modalButton1} onPress={() => setModalVisible(null)}>
                <Text style={styles.modalButtonText}>Tidak</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalButton2}
                onPress={() => {
                  setModalVisible(null);
                  navigation.navigate('Result');
                }}>
                <Text style={styles.modalButtonText}>Ya</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

    </View>
  );
};

export default ChatbotSpeechScreen;
