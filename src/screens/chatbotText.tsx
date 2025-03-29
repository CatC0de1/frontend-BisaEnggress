import React, {useState, useRef, useEffect} from 'react';
import {View, Text, TextInput, Pressable, ScrollView, Modal, TouchableOpacity, BackHandler} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../App'; // Import the ParamList type
import styles from '../styles/chatbotText.style';
import { useConnectionErrorToast } from '../components/ConnectionToast'; // Import the hook

const ChatbotTextScreen: React.FC = () => {
  const [modalVisible, setModalVisible] = useState<'kembali' | 'nilai' | null>(null);
  const [messages, setMessages] = useState<{text: string; sender: 'user' | 'bot'}[]>([]);
  const [input, setInput] = useState<string>('');
  const [canSend, setCanSend] = useState<boolean>(true); // State to control message alternation
  const [isTyping, setIsTyping] = useState<boolean>(false); // State for typing animation
  const [typingDots, setTypingDots] = useState<string>(''); // State for typing dots animation
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const scrollViewRef = useRef<ScrollView>(null); // Reference to the ScrollView

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      setModalVisible('kembali'); // Show "kembali" modal
      return true; // Prevent default back behavior
    });

    return () => backHandler.remove(); // Cleanup on unmount
  }, []);

  useEffect(() => {
    if (isTyping) {
      const frames = ['.    ', '. .  ', '. . .'];
      let frameIndex = 0;

      const interval = setInterval(() => {
        setTypingDots(frames[frameIndex]);
        frameIndex = (frameIndex + 1) % frames.length; // Loop through frames
      }, 500); // Update frame every 500ms

      return () => clearInterval(interval); // Cleanup interval on unmount or when typing stops
    }
  }, [isTyping]);

  // Toast for connection error
  // useConnectionErrorToast();

  const sendMessage = () => {
    if (input.trim() && canSend) {
      // Add user message
      setMessages([...messages, {text: input, sender: 'user'}]);
      setInput('');
      setCanSend(false); // Disable sending until bot responds
      setIsTyping(true); // Start typing animation

      // Simulate bot response after a delay
      setTimeout(() => {
        setIsTyping(false); // Stop typing animation
        setMessages(prevMessages => [
          ...prevMessages,
          {text: 'Ini balasan dari chatbot.', sender: 'bot'},
        ]);
        setCanSend(true); // Re-enable sending after bot responds
      }, 5000); // Simulate 3 seconds delay for bot response
    }
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
        {isTyping && (
          <Text style={styles.botMessage}>{typingDots}</Text> // Display typing animation
        )}
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
        <TouchableOpacity style={styles.sendButton} activeOpacity={0.6} onPress={sendMessage} disabled={!canSend}>
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
