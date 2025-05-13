import React, {useState, useRef, useEffect} from 'react';
import {View, Text, TextInput, ScrollView, TouchableOpacity} from 'react-native';
import styles from '../styles/chatbotText.style';
import { useConnectionErrorToast } from '../components/Toast'; // Import the hook
import HeaderAndModal from '../components/HeaderAndModal';
import { sendMessageToAi } from '../utils/ai'; // Import the system prompt
import systemPromptData from '../prompts/chat_user.json';

const ChatbotTextScreen: React.FC = () => {
  const [messages, setMessages] = useState<{text: string; sender: 'user' | 'bot'}[]>([]);
  const [input, setInput] = useState<string>('');
  const [canSend, setCanSend] = useState<boolean>(true); // State to control message alternation
  const [isTyping, setIsTyping] = useState<boolean>(false); // State for typing animation
  const [typingDots, setTypingDots] = useState<string>(''); // State for typing dots animation
  const scrollViewRef = useRef<ScrollView>(null); // Reference to the ScrollView
  const systemPrompt = systemPromptData.prompt;

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
  useConnectionErrorToast();

  const sendMessage = async () => {
    if (input.trim() && canSend) {
      // Add user message
      const userMessage = { text: input, sender: 'user' as const };
      setMessages([...messages, userMessage]);
      setInput('');
      setCanSend(false); // Disable sending until bot responds
      setIsTyping(true); // Start typing animation

      try {
        // Send system prompt and user message to ChatGPT
        const botResponse = await sendMessageToAi([
          { role: 'system', content: systemPrompt },
          { role: 'user', content: input },
        ]);

        // Add bot response
        setMessages(prevMessages => [
          ...prevMessages,
          { text: botResponse, sender: 'bot' as const },
        ]);
      } catch (error) {
        setMessages(prevMessages => [
          ...prevMessages,
          { text: 'Error: Unable to get a response from AI.', sender: 'bot' as const },
        ]);
      } finally {
        setIsTyping(false); // Stop typing animation
        setCanSend(true); // Re-enable sending
      }
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
