import { StyleSheet } from 'react-native';

const colors = {
  background: '#041f1f', 
  buttonBackground: '#14bbfb',
  buttonText: '#000',
  title: '#fff',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: colors.title,
  },
  logoContainer: {
    marginBottom: 50,
  },
  imagemContainer: {
    width: 220,
    height: 220,
    borderRadius: 110,
    overflow: 'hidden',
    marginBottom: 20,
    shadowColor: colors.shadowColor,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 5,
    backgroundColor: colors.overlayColor,
  },
  imagem: {
    width: '100%',
    height: '100%',
    borderRadius: 110,
    borderWidth: 1,
    borderColor: colors.buttonBackground,    
  },
  botao: {
    backgroundColor: colors.buttonBackground,
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 10,
    
    shadowColor: colors.shadowColor,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 5,
  },
  botaoTexto: {
    color: colors.buttonText,
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default styles;
