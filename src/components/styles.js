import { StyleSheet } from 'react-native';

export const colors = {
  background: '#fdfd96', 
  title: 'black', 
  borderColor: '#ff69b4', 
  buttonText: '#fff', 
  buttonBackground: '#ff69b4', 
  buttonSecondary: '#ffdf00', 
  buttonDanger: '#ff4500', 
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center', 
    justifyContent: 'center',
    backgroundColor: colors.background,
  },
  titulo: {
    color: colors.title,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  input: {
    width: '80%', 
    alignSelf: 'center',
    height: 40,
    borderColor: colors.buttonBackground,
    borderWidth: 1,
    marginVertical: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
  },
  botao: {
    backgroundColor: '#ff69b4',
    paddingVertical: 10, 
    paddingHorizontal: 30,
    borderRadius: 20,
    marginVertical: 10,
    alignSelf: 'center',
    borderWidth: 2,
    borderColor: '#000',
    width: '80%',
  },
  botaoTexto: {
    color: '#000',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  imagem: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#ff69b4',
  },
  imagemEscolhida: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 3,
    borderColor: 'black',
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 20, 
    overflow: 'hidden',
  },
  imagemEscolhidaInner: {
    width: '100%',
    height: '100%',
    borderRadius: 75,
    borderWidth: 4,
    borderColor: colors.borderColor,
  },
  logoContainer: {
    borderRadius: 52,
    borderWidth: 2,
    borderColor: '#000',
    padding: 2,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  imagemContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    backgroundColor: colors.buttonBackground,
    color: '#fff',
    padding: 10,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderColor,
    justifyContent: 'space-between',
    paddingRight: 20,
  },
  nome: {
    fontWeight: 'bold',
    color: colors.title, 
  },
  texto: {
    color: '#333', 
  },
  botaoSecundario: {
    backgroundColor: colors.buttonSecondary, 
    padding: 10,
    borderRadius: 20,
    marginVertical: 10,
    alignItems: 'center',
    borderWidth: 2, 
    borderColor: '#000', 
  }, taoPerigo: {
    backgroundColor: colors.buttonDanger, 
  },
  containerFornecedor: {
    padding: 20,
    backgroundColor: '#fdfd96', 
  },
  imagemFornecedor: {
    width: 200,
    height: 200,
    borderRadius: 100, 
    borderWidth: 5,
    borderColor: '#ff69b4', 
    marginBottom: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#fff', 
    borderBottomWidth: 1,
    borderBottomColor: '#eee', 
  },
  itemTextContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  actionButton: {
    padding: 10,
    marginVertical: 2,
    backgroundColor: '#f0f0f0', 
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    minWidth: 80, 
  },
  actionButtonText: {
    color: '#333', 
  },
  actionButtonContainer: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  botaoAlterar: {
    backgroundColor: '#ff69b4', 
    padding: 10,
    borderRadius: 20,
    marginVertical: 5,
    alignSelf: 'flex-end', 
    borderWidth: 2, 
    borderColor: '#000'
  },
  botaoExcluir: {
    backgroundColor: '#ff4500', 
    padding: 10,
    borderRadius: 20,
    marginVertical: 5,
    alignSelf: 'flex-end', 
    borderWidth: 2, 
    borderColor: '#000'
  },
  buttonGroup: {
    flexDirection: 'column',
    alignItems: 'flex-end', 
  },
  fornecedorImagem: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
    borderWidth: 2, 
    borderColor: '#000', 
  },
  infoContainer: {
    flex: 1, 
    justifyContent: 'center', 
  },

});


