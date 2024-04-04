

import React from 'react';
import { View, Text, Image, Button, StyleSheet } from 'react-native';


const TelaInicial = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.nome}>Meeting</Text>
      <Image
        source={require('../../assets/icon.png')}
        style={styles.logo}
      />
      <Button
        title="Cadastrar"
        onPress={() => navigation.navigate('CadastroFornecedor')}
      />
      <Button
        title="Consultar"
        onPress={() => navigation.navigate('ListagemFornecedores')}
      />
      <Button
        title="Perfil do Fornecedor"
        onPress={() => navigation.navigate('PerfilFornecedor')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  nome: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  logo: {
    width: 150, 
    height: 150, 
    marginBottom: 20,
  },
});

export default TelaInicial;