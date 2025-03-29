import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 100, // Add padding to account for the header height
  },

  header: {
    position: 'absolute',
    // top: 0,
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

  chatbox: {
    flex: 1,
    margin: 10,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#f9f9f9',
    elevation: 3, // Shadow for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },

  chatMessage: {
    alignSelf: 'flex-end', // Align to the right for user messages
    maxWidth: '65%', // Maximum width of 65%
    marginVertical: 5,
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#e1e1e1',
  },

  botMessage: {
    alignSelf: 'flex-start', // Align to the left for bot messages
    maxWidth: '65%', // Maximum width of 65%
    marginVertical: 5,
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#3b82f6', // Blue background for bot messages
    color: '#fff', // White text color
  },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    // borderTopWidth: 1,
    borderTopColor: '#ccc',
    elevation: 1, // Shadow for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: {width: 0, height: -1},
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },

  input: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginRight: 10,
  },

  sendButton: {
    backgroundColor: '#0078d4',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },

  sendButtonText: {
    color: '#fff',
    fontWeight: 'bold',
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
