import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Pressable, Modal} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import FontAwesome icons
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../App'; // Import the ParamList type
import styles from '../styles/chatbotSpeech.style';

const ChatbotSpeechScreen: React.FC = () => {

  const [modalVisible, setModalVisible] = useState<'kembali' | 'nilai' | null>(null);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Bisa Enggress</Text>
      <View style={styles.actionButtons}>
      <Pressable
          onPress={() => setModalVisible('kembali')} // Fix: Correct modal type
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
          onPress={() => setModalVisible('nilai')} // Fix: Correct modal type
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
