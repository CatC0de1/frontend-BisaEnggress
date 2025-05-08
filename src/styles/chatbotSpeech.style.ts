import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },

  speechButton: {
    width: 225,
    height: 225,
    borderRadius: 200,
    backgroundColor: '#0078d4',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5, // Shadow for Android
  },

  speechButtonText: {
    marginTop: 5,
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  botSpeech: {
    width: 225,
    height: 225,
    borderRadius: 200,
    backgroundColor: '#3b82f6',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5, // Shadow for Android
  },

  progressSpeech: {
    width: 225,
    height: 225,
    borderRadius: 200,
    backgroundColor: 'rgba(59, 130, 246, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5, // Shadow for Android
  },

  centerMic: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
