
import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { styles, colors } from './styles';

const TelaInicial = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Meeting</Text>
      
      <View style={styles.logoContainer}>
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