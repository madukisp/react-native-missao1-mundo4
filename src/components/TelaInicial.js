import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import styles from '../styles/TelaInicialStyles';

const TelaInicial = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Cadastro de Fornecedores</Text>
      
      <View style={styles.imagemContainer}>
        <Image
          source={require('../../assets/logo.png')}
          style={styles.imagem}
        />
      </View>

      <TouchableOpacity
        style={styles.botao}
        onPress={() => navigation.navigate('CadastroFornecedor')}
      >
        <Text style={styles.botaoTexto}>Cadastrar</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.botao}
        onPress={() => navigation.navigate('ListagemFornecedores')}
      >
        <Text style={styles.botaoTexto}>Consultar</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TelaInicial;
