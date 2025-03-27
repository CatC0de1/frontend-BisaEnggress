import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 60, // Adjust for header height
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: -1,
  },

  header: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff',
    padding: 20,
    backgroundColor: '#3b82f6',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    elevation: 50, // Enhanced shadow for Android
    shadowColor: '#000', // Enhanced shadow for iOS
    shadowOffset: {width: 0, height: 40},
    shadowOpacity: 0.9,
    shadowRadius: 50,
    position: 'absolute',
    top: 0,
    width: '100%',
    zIndex: -21,
  },

  content: {
    width: '80%',
    padding: 20,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    backgroundColor: '#fff',
    elevation: 5, // Enhanced shadow for Android
    shadowColor: '#000', // Enhanced shadow for iOS
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 5,
    zIndex: -2,
  },

  title: {
    fontSize: 23,
    fontWeight: 'bold',
    color: '#3b82f6',
    marginBottom: 10,
  },

  contentText: {
    fontSize: 18,
    textAlign: 'center',
  },

  actionsButtons: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 40,
  },

  button: {
    // borderWidth: 2,
    // borderColor: '#3b82f6',
    backgroundColor: '#3b82f6',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 5,
    width: '45%',
    alignItems: 'center',
  },

  buttonText: {
    // color: '#3b82f6',
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },

});

export default styles;
