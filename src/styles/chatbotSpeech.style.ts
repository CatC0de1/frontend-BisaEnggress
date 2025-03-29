import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 60, // Adjust for header height
    justifyContent: 'center',
    alignItems: 'center',
  },

  header: {
    position: 'absolute',
    top: 0,
    // left: 0,
    // right: 0,
    // height: 100, // Set a fixed height for the header
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    elevation: 5, // Shadow for Android
    shadowColor: '#000', // Shadow for iOS
    // shadowOffset: {width: 0, height: 2}, // Shadow only at the bottom
    // shadowOpacity: 0.2,
    // shadowRadius: 3,
    backgroundColor: '#fff',
    justifyContent: 'center', // Center content vertically
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
    position: 'relative', // Ensure proper positioning
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

export default styles;
