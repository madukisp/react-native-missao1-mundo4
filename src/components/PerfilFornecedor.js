import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const PerfilFornecedor = ({ route }) => {
  const { fornecedor } = route.params;

  return (
    <View style={styles.container}>
      <Image source={{ uri: fornecedor.imagemUri }} style={styles.imagem} />
      <Text style={styles.nome}>{fornecedor.nome}</Text>
      <Text style={styles.detalhe}>{fornecedor.endereco}</Text>
      <Text style={styles.detalhe}>{fornecedor.telefone}</Text>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imagem: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  nome: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  detalhe: {
    fontSize: 18,
    marginVertical: 4,
  },
  imagemFornecedorContainer: {
    marginBottom: 20,
  },
  imagemFornecedor: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
});

export default PerfilFornecedor;
