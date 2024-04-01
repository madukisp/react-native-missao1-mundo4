import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import styles from '../styles/ListagemFornecedoresStyles';

const ListagemFornecedores = ({ fornecedores, onExcluir }) => {
  const renderItem = ({ item }) => {
    return (
      <View style={styles.item}>
        <Image source={{ uri: item.imagemUri }} style={styles.image} />
        <View style={styles.textContainer}>
          <Text>{item.nome}</Text>
          <Text>{item.endereco}</Text>
          <Text>{item.telefone}</Text>
        </View>
        <TouchableOpacity style={styles.excluirButton} onPress={() => onExcluir(item.id)}>
          <Text style={styles.excluirButtonText}>Excluir</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <FlatList
      data={fornecedores}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem}
    />
  );
};

export default ListagemFornecedores;
