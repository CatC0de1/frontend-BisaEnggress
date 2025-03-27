import React, {useState, useRef} from 'react';
import {View, Text, TextInput, TouchableWithoutFeedback, ScrollView, Modal, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../App'; // Import the ParamList type
import styles from '../styles/chatbotText.style';

const ChatbotTextScreen: React.FC = () => {
  const [modalVisible, setModalVisible] = useState<'kembali' | 'nilai' | null>(null);
  const [messages, setMessages] = useState<{text: string; sender: 'user' | 'bot'}[]>([]);
  const [input, setInput] = useState<string>('');
  const [canSend, setCanSend] = useState<boolean>(true); // State to control message alternation
  const [isPressed1, setIsPressed1] = useState<boolean>(false);
  const [isPressed2, setIsPressed2] = useState<boolean>(false);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const scrollViewRef = useRef<ScrollView>(null); // Reference to the ScrollView

  const sendMessage = () => {
    if (input.trim() && canSend) {
      // Add user message
      setMessages([...messages, {text: input, sender: 'user'}]);
      setInput('');
      setCanSend(false); // Disable sending until bot responds

      // Simulate bot response after a delay
      setTimeout(() => {
        setMessages(prevMessages => [
          ...prevMessages,
          {text: 'Ini adalah balasan dari bot.', sender: 'bot'},
        ]);
        setCanSend(true); // Re-enable sending after bot responds
      }, 1000);
    }
  };

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
      <ScrollView
        style={styles.chatbox}
        ref={scrollViewRef}
        onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({animated: true})}>
        {messages.map((message, index) => (
          <Text
            key={index}
            style={message.sender === 'user' ? styles.chatMessage : styles.botMessage}>
            {message.text}
          </Text>
        ))}
      </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Tulis pesan..."
          placeholderTextColor={'#999'}
          value={input}
          onChangeText={setInput}
          editable={canSend} // Disable input when waiting for bot response
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage} disabled={!canSend}>
          <Text style={styles.sendButtonText}>Kirim</Text>
        </TouchableOpacity>
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

export default ChatbotTextScreen;
