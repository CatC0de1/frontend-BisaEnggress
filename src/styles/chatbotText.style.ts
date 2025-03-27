import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 60, // Adjust for header height
  },

  header: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff',
    padding: 20,
    backgroundColor: '#3b82f6',
    // borderBottomWidth: 1,
    // borderBottomColor: '#ddd',
    elevation: 50, // Enhanced shadow for Android
    shadowColor: '#000', // Enhanced shadow for iOS
    shadowOffset: {width: 0, height: 40},
    shadowOpacity: 0.9,
    shadowRadius: 50,
    position: 'absolute',
    top: 0,
    width: '100%',
    zIndex: 1,
  },

  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    padding: 10,
  },

  button: {
    borderWidth: 2,
    borderColor: '#3b82f6',
    borderRadius: 8,
    paddingVertical: 5,
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
    borderTopWidth: 1,
    borderTopColor: '#ccc',
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
