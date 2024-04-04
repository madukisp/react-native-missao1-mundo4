
import React, { useContext } from 'react';
import { SectionList, View, Text, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { FornecedoresContext } from '../context/FornecedoresContext';

const ListagemFornecedores = ({ navigation }) => {
  const { fornecedores, excluirFornecedor } = useContext(FornecedoresContext);

  // Agrupar fornecedores por inicial do nome
  const fornecedoresAgrupados = fornecedores.reduce((acc, fornecedor) => {
    const initial = fornecedor.nome[0].toUpperCase();
    if (!acc[initial]) {
      acc[initial] = [];
    }
    acc[initial].push(fornecedor);
    return acc;
  }, {});

  // Ordenar cada grupo e criar as seções
  const sectionData = Object.keys(fornecedoresAgrupados)
    .sort()
    .map(key => ({
      title: key,
      data: fornecedoresAgrupados[key].sort((a, b) => a.nome.localeCompare(b.nome)),
    }));

  const handleAlterarPress = fornecedor => {
    navigation.navigate('CadastroFornecedor', { fornecedor });
  };

  const handleExcluirPress = id => {
    Alert.alert(
      'Excluir Fornecedor',
      'Tem certeza que deseja excluir este fornecedor?',
      [
        { text: 'Cancelar' },
        {
          text: 'Excluir',
          onPress: () => excluirFornecedor(id),
        },
      ],
    );
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Image source={{ uri: item.imagemUri }} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.nome}>{item.nome}</Text>
        <Text>{item.endereco}</Text>
        <Text>{item.telefone}</Text>
      </View>
      <TouchableOpacity style={styles.botao} onPress={() => handleAlterarPress(item)}>
        <Text style={styles.botaoTexto}>Alterar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.botao} onPress={() => handleExcluirPress(item.id)}>
        <Text style={styles.botaoTexto}>Excluir</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SectionList
      sections={sectionData}
      renderItem={renderItem}
      renderSectionHeader={({ section: { title } }) => (
        <Text style={styles.sectionHeader}>{title}</Text>
      )}
      keyExtractor={(item, index) => `list-item-${index}`}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
  },
  sectionHeader: {
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 18,
    fontWeight: 'bold',
    backgroundColor: '#f0f0f0',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
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
  nome: {
    fontWeight: 'bold',
  },
  endereco: {},
  telefone: {},
  excluirButton: {
    backgroundColor: '#ea3333',
    padding: 10,
    borderRadius: 5,
    marginLeft: 10,
  },
  excluirButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  botao: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 5,
    margin: 5,
  },
  botaoTexto: {
    color: 'black',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default ListagemFornecedores;