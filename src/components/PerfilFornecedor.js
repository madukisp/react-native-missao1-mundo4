import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const colors = {
  background: '#041f1f', 
  borderColor: '#ff69b4', 
  buttonText: '#fff',  
  title: 'white', 
};

const PerfilFornecedor = ({ route }) => {
  const { fornecedor } = route.params;

  return (
    <View style={styles.container}>
      <Image source={{ uri: fornecedor.imagemUri }} style={styles.imagem} />
      <Text style={styles.nome}>{fornecedor.nome}</Text>
      <Text style={styles.detalhe}>{fornecedor.endereco || 'Endereço não disponível'}</Text>
      <Text style={styles.detalhe}>{fornecedor.telefone || 'Telefone não disponível'}</Text>
      <Text style={styles.detalhe}>{fornecedor.categoria || 'Categoria não definida'}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: colors.background,
  },
  imagem: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 8,
  },
  nome: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 8,
    color: colors.title,
  },
  detalhe: {
    fontSize: 18,
    marginVertical: 4,
    color: '#ccc',
  },
});

export default PerfilFornecedor;
