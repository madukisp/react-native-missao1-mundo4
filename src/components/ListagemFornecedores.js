import React, { useContext } from 'react';
import { SectionList, View, Text, Image, TouchableOpacity, Alert } from 'react-native';
import { FornecedoresContext } from '../context/FornecedoresContext';
import { styles } from './styles';

const ListagemFornecedores = ({ navigation }) => {
  const { fornecedores, excluirFornecedor } = useContext(FornecedoresContext);

  
  const sectionData = Object.entries(
    fornecedores.reduce((acc, fornecedor) => {
      const initial = fornecedor.nome[0].toUpperCase();
      if (!acc[initial]) {
        acc[initial] = [];
      }
      acc[initial].push(fornecedor);
      return acc;
    }, {})
  )
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([title, data]) => ({ title, data }));

  
  const handleAlterarPress = fornecedor => {
    navigation.navigate('CadastroFornecedor', { fornecedor });
  };

  
  const handleExcluirPress = id => {
    Alert.alert(
      'Excluir Fornecedor',
      'Tem certeza que deseja excluir este fornecedor?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Excluir', onPress: () => excluirFornecedor(id), style: 'destructive' }
      ]
    );
  };

  
  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <View style={styles.fornecedorImagemWrapper}>
        <View style={styles.fornecedorImagemBorder}>
          <Image source={{ uri: item.imagemUri }} style={styles.imagemFornecedor} />
        </View>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.nome}>{item.nome}</Text>
        <Text style={styles.texto}>{item.endereco}</Text>
        <Text style={styles.texto}>{item.telefone}</Text>
      </View>
      <View style={styles.buttonGroup}>
        <TouchableOpacity style={styles.botaoAlterar} onPress={() => handleAlterarPress(item)}>
          <Text style={styles.botaoTexto}>Alterar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.botaoExcluir} onPress={() => handleExcluirPress(item.id)}>
          <Text style={styles.botaoTexto}>Excluir</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SectionList
      sections={sectionData}
      renderItem={renderItem}
      renderSectionHeader={({ section: { title } }) => (
        <Text style={styles.sectionHeader}>{title}</Text>
      )}
      keyExtractor={(item, index) => `list-item-${item.id}-${index}`}
    />
  );
};

export default ListagemFornecedores;
