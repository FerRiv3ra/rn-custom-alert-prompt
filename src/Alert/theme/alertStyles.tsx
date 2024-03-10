import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    width: '90%',
    borderRadius: 10,
    paddingTop: 20,
  },
  title: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
  description: {
    textAlign: 'center',
    marginTop: 8,
    paddingHorizontal: '15%',
  },
  textInput: {
    borderColor: '#e0e0e3',
    borderWidth: 1,
    backgroundColor: '#FFF',
    marginHorizontal: '5%',
    marginTop: 10,
    padding: 7,
    borderRadius: 3,
  },
  buttonsContainer: {
    flexDirection: 'row',
    marginTop: 15,
  },
  button: {
    flex: 1,
    backgroundColor: 'transparent',
    borderTopColor: '#e0e0e3',
    borderLeftColor: '#e0e0e3',
    paddingVertical: 12,
    borderTopWidth: 1,
  },
});
