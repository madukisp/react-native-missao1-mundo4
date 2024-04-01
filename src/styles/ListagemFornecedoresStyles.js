import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    backgroundColor: '#EDE7F6',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    paddingVertical: 10, 
    paddingHorizontal: 20, 
    marginHorizontal: 20, 
    borderRadius: 8,
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 15,
    borderWidth: 2,
    borderColor: '#8A2BE2',
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    
  },
  excluirButton: {
    backgroundColor: '#ea3333',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 5,
  },
  excluirButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default styles;
