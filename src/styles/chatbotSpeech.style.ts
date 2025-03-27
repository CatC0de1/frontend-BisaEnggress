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
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff',
    padding: 20,
    backgroundColor: '#3b82f6',
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
    position: 'absolute',
    top: 90,
    flexDirection: 'row',
    justifyContent: 'space-between',
    // marginTop: 20,
    paddingHorizontal: 10,
    width: '100%',
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

  speechButton: {
    width: 200,
    height: 200,
    borderRadius: 100,
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
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  speechResult: {
    marginTop: 20,
    fontSize: 18,
    textAlign: 'center',
    color: '#333',
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
