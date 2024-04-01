import React from 'react';
import { View, Text, FlatList, Image, StyleSheet, Button } from 'react-native';

const ListagemFornecedores = ({ fornecedores, onExcluir, onAtualizar }) => {
  const renderItem = ({ item }) => {
    return (
      <View style={styles.item}>
        <Image source={{ uri: item.imagemUri }} style={styles.image} />
        <View style={styles.textContainer}>
          <Text>{item.nome}</Text>
          <Text>{item.endereco}</Text>
          <Text>{item.telefone}</Text>
        </View>
        <Button title="Excluir" onPress={() => onExcluir(item.id)} />
        <Button title="Atualizar" onPress={() => onAtualizar(item.id)} />

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

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    alignItems: 'center',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
});

export default ListagemFornecedores;
