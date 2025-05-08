import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 100,
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
    alignSelf: 'flex-end',
    maxWidth: '65%',
    marginVertical: 5,
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#e1e1e1',
  },

  botMessage: {
    alignSelf: 'flex-start',
    maxWidth: '65%',
    marginVertical: 5,
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#3b82f6',
    color: '#fff',
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
});

export default styles;
