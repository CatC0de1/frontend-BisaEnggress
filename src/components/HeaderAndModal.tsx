import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, Modal, TouchableOpacity, StyleSheet, BackHandler } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/screens';
import { sendMessageToAi } from '../utils/ai'; // Import the AI utility
import evaluatePrompt from '../prompts/evaluate.json';

const HeaderAndModal: React.FC = () => {

  const [modalVisible, setModalVisible] = useState<'kembali' | 'nilai' | null>(null);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      setModalVisible('kembali'); // Show "kembali" modal
      return true; // Prevent default back behavior
    });

    return () => backHandler.remove(); // Cleanup on unmount
  }, []);

  const handleEvaluateAndNavigate = async () => {
    try {
      const evaluationCode = evaluatePrompt.evaluate; // Use the evaluation prompt from JSON
      const botResponse = await sendMessageToAi([
        { role: 'system', content: 'Evaluate the user\'s English skills.' },
        { role: 'user', content: evaluationCode },
      ]);
      setModalVisible(null);
      navigation.navigate('Result', { evaluationResult: botResponse }); // Pass evaluation result to Result screen
    } catch (error) {
      console.error('Error during evaluation:', error);
      setModalVisible(null);
      navigation.navigate('Result', { evaluationResult: 'Error: Unable to evaluate.' });
    }
  };

  return (
    <>
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

      {/* Modal for "Kembali" */}
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

      {/* Modal for "Nilai" */}
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
                onPress={handleEvaluateAndNavigate}>
                <Text style={styles.modalButtonText}>Ya</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    top: 0,
    // left: 0,
    // right: 0,
    // height: 100,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    elevation: 5, // Shadow for Android
    shadowColor: '#000', // Shadow for iOS
    // shadowOffset: {width: 0, height: 2}, // Shadow only at the bottom
    // shadowOpacity: 0.2,
    // shadowRadius: 3,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },

  headerTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#3498db',
    paddingTop: 10,
  },

  actionButtons: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },

  button: {
    borderWidth: 2,
    borderColor: '#3b82f6',
    borderRadius: 8,
    paddingVertical: 2,
    paddingHorizontal: 20,
    width: '48%',
    alignItems: 'center',
  },

  buttonActive: {
    backgroundColor: '#3b82f6',
  },

  buttonText: {
    color: '#3b82f6',
    fontSize: 15,
    fontWeight: 'bold',
  },

  buttonTextActive: {
    color: '#fff',
  },

  // Modal styles
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },

  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },

  modalText: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 10,
  },

  actionButtonsModal: {
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },

  modalButton1: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 8,
    width: '48%',
    alignItems: 'center',
  },

  modalButton2: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 8,
    width: '48%',
    alignItems: 'center',
  },

  modalButtonText: {
    fontSize: 15,
    color: 'white',
    fontWeight: 'bold',
  },
});

export default HeaderAndModal;
