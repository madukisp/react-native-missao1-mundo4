import { StyleSheet } from 'react-native';

export const colors = {
  background: '#041f1f',
  borderColor: '#688793',
  buttonBackground: '#688793',
  buttonDanger: '#ff4500',
  buttonSecondary: '#ffdf00',
  buttonText: '#fff',
  title: '#fff',
  text: '#ccc',
};

const styles = StyleSheet.create({
  containerListagem: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: 10,
  },
  inputBusca: {
    backgroundColor: '#fff',
    borderColor: colors.borderColor,
    borderRadius: 10,
    borderWidth: 1,
    marginHorizontal: 10,
    padding: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    borderBottomColor: colors.borderColor,
    borderBottomWidth: 1,
    padding: 10,
    justifyContent: 'space-between',
  },
  imagemFornecedor: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  infoContainer: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    paddingLeft: 10,
  },
  nomeFornecedor: {
    color: colors.title,
    fontSize: 18,
    fontWeight: 'bold',
  },
  textoFornecedor: {
    color: colors.text,
  },
  categoriaFornecedor: {
    color: colors.text,
  },
  buttonContainer: {
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  botaoAlterar: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.buttonBackground,
    padding: 8,
    borderRadius: 20,
    marginBottom: 5,
  },
  botaoExcluir: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.buttonDanger,
    padding: 8,
    borderRadius: 20,
  },
  botaoTexto: {
    color: colors.buttonText,
    fontWeight: 'bold',
  },
  sectionHeader: {
    backgroundColor: colors.buttonBackground,
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    padding: 10,
    marginHorizontal: 15,
  },
  botaoAdicionar: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: 20,
    bottom: 10,
    backgroundColor: colors.buttonBackground,
    borderRadius: 30,
    padding: 2,
  },
});

export default styles;
