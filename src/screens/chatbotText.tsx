import React, {useState, useRef, useEffect} from 'react';
import {View, Text, TextInput, ScrollView, TouchableOpacity} from 'react-native';
import styles from '../styles/chatbotText.style';
import { useConnectionErrorToast } from '../components/Toast'; // Import the hook
import HeaderAndModal from '../components/HeaderAndModal';

const ChatbotTextScreen: React.FC = () => {

  const [messages, setMessages] = useState<{text: string; sender: 'user' | 'bot'}[]>([]);
  const [input, setInput] = useState<string>('');
  const [canSend, setCanSend] = useState<boolean>(true); // State to control message alternation
  const [isTyping, setIsTyping] = useState<boolean>(false); // State for typing animation
  const [typingDots, setTypingDots] = useState<string>(''); // State for typing dots animation
  const scrollViewRef = useRef<ScrollView>(null); // Reference to the ScrollView

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

      <HeaderAndModal />

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

    </View>
  );
};

export default ChatbotTextScreen;
