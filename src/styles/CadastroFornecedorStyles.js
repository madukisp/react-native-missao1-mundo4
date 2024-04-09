import { StyleSheet } from 'react-native';

export const colors = {
  background: '#041f1f', 
  borderColor: '#688793', 
  buttonBackground: '#688793', 
  buttonDelete: '#ff4500', 
  buttonSecondary: '#ffdf00', 
  buttonText: '#fff', 
  title: '#fff',  
  text: '#ccc', 
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: colors.background,
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  titulo: {
    color: colors.title,
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
    textAlign: 'center',
  },
  input: {
    alignSelf: 'center',
    backgroundColor: '#fff',
    borderColor: colors.buttonBackground,
    borderRadius: 10,
    borderWidth: 1,
    height: 40,
    marginVertical: 10,
    padding: 10,
    width: '80%',
  },
  label: {
    fontSize: 16,
    color: colors.title,
    marginTop: 10,
  },
  pickerContainer: {
    alignItems: 'center',
    marginTop: 10,
    width: '80%',
  },  
  picker: {
    height: 50,
    width: '100%',
    color: colors.title,
  },
  botao: {
    alignSelf: 'center',
    backgroundColor: colors.buttonBackground,
    borderColor: '#000',
    borderRadius: 20,
    borderWidth: 2,
    marginVertical: 10,
    paddingVertical: 10,
    paddingHorizontal: 30,
    width: '80%',
  },
  textoBotao: {
    color: colors.buttonText,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  textoBotaoSalvar: {
    color: colors.buttonText,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  imagemEscolhida: {
    alignSelf: 'center',
    borderColor: 'black',
    borderRadius: 75,
    borderWidth: 3,
    height: 150,
    marginBottom: 20,
    marginTop: 20,
    overflow: 'hidden',
    width: 150,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  contactImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  modalItem: {
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    flexDirection: 'row',
    padding: 10,
  },
  placeholderImage: {
    backgroundColor: 'gray',
    borderRadius: 25,
    height: 50,
    width: 50,
  },
  contactName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
    color: colors.title,
  },
  contactNumber: {
    fontSize: 16,
    color: 'gray',
    marginLeft: 10,
  },
  menuItemText: {
    fontSize: 18, 
  },
  scrollView: {
    flex: 1,    
  },
  container: {
    flex: 1,    
  },
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollViewContainer: {
    flexGrow: 1,
    backgroundColor: colors.background,
  },  
});

export default styles;
