import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './src/screens/home';
import ChatbotText from './src/screens/chatbotText';
import ChatbotSpeech from './src/screens/chatbotSpeech';
import Result from './src/screens/result';
import SplashScreen from './src/screens/splash';
import Toast from 'react-native-toast-message';
import { RootStackParamList } from './src/components/dataType'; // Import the type

const Stack = createNativeStackNavigator<RootStackParamList>();

function App(): React.JSX.Element {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Splash"
          screenOptions={{
            headerShown: false,
            animation: 'fade',
          }}
        >
          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="ChatbotText" component={ChatbotText} />
          <Stack.Screen name="ChatbotSpeech" component={ChatbotSpeech} />
          <Stack.Screen name="Result" component={Result} />
        </Stack.Navigator>
      </NavigationContainer>
      <Toast />
    </>
  );
}

export default App;
