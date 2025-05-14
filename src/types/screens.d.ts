export type RootStackParamList = {
  Splash: undefined;
  Home: undefined;
  ChatbotText: { role: 'man' | 'woman' };
  ChatbotSpeech: { role: 'man' | 'woman' };
  Result: { evaluationResult: string };
};
