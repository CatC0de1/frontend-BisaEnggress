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
    textAlign: 'justify',
    marginVertical: 20,
  },

  nilaiContent: {
    fontSize: 18,
    textAlign: 'left',
  },

  nilai: {
    fontSize: 18,
    fontWeight: 'bold',
  },

  titleDrop: {
    color: '#3498db',
    fontWeight: 'bold',
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
