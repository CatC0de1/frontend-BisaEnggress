import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingTop: 60,
    gap: 25,
  },

  header: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#3498db',
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    elevation: 5, // Shadow for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 2,
    position: 'absolute',
    top: 0,
    width: '100%',
    zIndex: 1,
  },

  content: {
    alignItems: 'center',
    marginBottom: 20,
  },

  contentText: {
    fontSize: 20,
  },

  title: {
    fontSize: 23,
    fontWeight: 'bold',
    color: '#3498db',
  },

  meme: {
    fontSize: 23,
    fontStyle: 'italic',
    fontWeight: 'bold',
    color: '#e74c3c',
  },

  button: {
    backgroundColor: '#3498db',
    paddingHorizontal: 25,
    paddingVertical: 10,
    borderRadius: 8,
  },

  buttonText: {
    fontSize: 25,
    color: 'white',
    fontWeight: 'bold',
  },

  buttonText2: {
    fontSize: 15,
    color: 'white',
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
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },

  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  optionGroup: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },

  option: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    fontSize: 16,
    textAlign: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    // borderRadius: 5,
    // marginHorizontal: -1,
    backgroundColor: '#fff',
  },

  selectedOption: {
    color: '#3498db',
    borderColor: '#3498db',
    backgroundColor: '#eaf6ff',
    fontWeight: 'bold',
  },

  actionButtons: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },

  closeButton: {
    backgroundColor: '#e74c3c',
    padding: 10,
    borderRadius: 8,
    width: '48%',
    alignItems: 'center',
  },

  nextButton: {
    backgroundColor: '#2ecc71',
    padding: 10,
    borderRadius: 8,
    width: '48%',
    alignItems: 'center',
  },

});

export default styles;
