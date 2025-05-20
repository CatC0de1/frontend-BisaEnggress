import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Modal, BackHandler } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/AntDesign';
import { RootStackParamList } from '../types/screens';
import styles from '../styles/home.style'; // import styles
import { useConnectionErrorToast } from '../components/Toast'; // Import the toast function and hook
import Header from '../components/Header'; // Import the reusable Header component

const HomeScreen: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [exitModalVisible, setExitModalVisible] = useState(false);
  const [chatbotType, setChatbotType] = useState<'text' | 'speech'>('text');
  const [role, setRole] = useState<'man' | 'woman'>('man');

  // Use the typed navigation prop
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const navigateToChatbot = () => {
    if (chatbotType === 'text') {
      navigation.navigate('ChatbotText', { role });
    } else {
      navigation.navigate('ChatbotSpeech', { role });
    }
    setModalVisible(false);
  };

  const handleExitApp = () => {
    BackHandler.exitApp(); // Exit the app
  };

  useEffect(() => {
    const backAction = () => {
      setExitModalVisible(true); // Show the exit confirmation modal
      return true; // Prevent default back button behavior
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => backHandler.remove(); // Cleanup the event listener
  }, []);

  // Toast for connection error
  useConnectionErrorToast();  // use hook for call toast

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.content}>
        <Text style={styles.contentText}>Dengan <Text style={styles.title}>Bisa Enggress</Text>,</Text>
        <Text style={styles.contentText}>jangan katakan</Text>
        <Text style={styles.meme}>'Ga Bisa Enggress'</Text>
      </View>
      <TouchableOpacity style={styles.button} activeOpacity={0.6} onPress={() => setModalVisible(true)}>
        <Text style={styles.buttonText}>Mulai</Text>
      </TouchableOpacity>

      {/* Chatbot Selection Modal */}
      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Pilih Tipe Chatbot</Text>
            <View style={styles.optionGroup}>
              <TouchableOpacity onPress={() => setChatbotType('text')}>
                <Text style={[styles.option, chatbotType === 'text' && styles.selectedOption]}>Text</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setChatbotType('speech')}>
                <Text style={[styles.option, chatbotType === 'speech' && styles.selectedOption]}>Speech</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.modalTitle}>Pilih Role Chatbot</Text>
            <View style={styles.optionGroup}>
              <TouchableOpacity onPress={() => setRole('man')}>
                <Text style={[styles.option, role === 'man' && styles.selectedOption]}>
                  <Icon name="man" size={25} color={role === 'man' ? '#3b82f6' : '#000'} />
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setRole('woman')}>
                <Text style={[styles.option, role === 'woman' && styles.selectedOption]}>
                  <Icon name="woman" size={25} color={role === 'woman' ? '#3b82f6' : '#000'} />
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.actionButtons}>
              <TouchableOpacity style={styles.closeButton} activeOpacity={0.6} onPress={() => setModalVisible(false)}>
                <Text style={styles.buttonText2}>Kembali</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.nextButton} activeOpacity={0.6} onPress={navigateToChatbot}>
                <Text style={styles.buttonText2}>Mulai!</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Exit Confirmation Modal */}
      <Modal visible={exitModalVisible} transparent animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Apakah Anda yakin ingin keluar dari aplikasi?</Text>
            <View style={styles.actionButtons}>
              <TouchableOpacity
                style={styles.closeButton}
                activeOpacity={0.6}
                onPress={() => setExitModalVisible(false)}
              >
                <Text style={styles.buttonText2}>Tidak</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.nextButton}
                activeOpacity={0.6}
                onPress={handleExitApp}
              >
                <Text style={styles.buttonText2}>Ya</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default HomeScreen;
