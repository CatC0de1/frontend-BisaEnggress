import React, {useState} from 'react';
import {View, Text, TouchableOpacity, TouchableWithoutFeedback, Modal} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import FontAwesome icons
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../App'; // Import the ParamList type
import styles from '../styles/chatbotSpeech.style';

const ChatbotSpeechScreen: React.FC = () => {
  const [isPressed1, setIsPressed1] = useState<boolean>(false);
  const [isPressed2, setIsPressed2] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<'kembali' | 'nilai' | null>(null);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Bisa Enggress</Text>
      <View style={styles.actionButtons}>
        <TouchableWithoutFeedback
          onPressIn={() => setIsPressed1(true)}
          onPressOut={() => setIsPressed1(false)}
          onPress={() => setModalVisible('kembali')}
        >
          <View style={[styles.button, isPressed1 && styles.buttonActive]}>
            <Text style={[styles.buttonText, isPressed1 && styles.buttonTextActive]}>
              Kembali
            </Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback
          onPressIn={() => setIsPressed2(true)}
          onPressOut={() => setIsPressed2(false)}
          onPress={() => setModalVisible('nilai')}
        >
          <View style={[styles.button, isPressed2 && styles.buttonActive]}>
            <Text style={[styles.buttonText, isPressed2 && styles.buttonTextActive]}>
              Nilai
            </Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
      <TouchableOpacity style={styles.speechButton}>
        <Icon name="microphone" size={50} color="#fff" />
        <Text style={styles.speechButtonText}>Tahan untuk bicara</Text>
      </TouchableOpacity>

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
