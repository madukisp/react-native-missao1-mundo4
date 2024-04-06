import React, { useContext } from 'react';
import { SectionList, View, Text, Image, TouchableOpacity } from 'react-native';
import { FornecedoresContext } from '../context/FornecedoresContext';
import { styles } from './styles';

const ListagemFornecedores = ({ navigation }) => {
  const { fornecedores } = useContext(FornecedoresContext);

  
  const sections = Object.entries(fornecedores.reduce((acc, fornecedor) => {
    const initial = fornecedor.nome[0].toUpperCase();
    if (!acc[initial]) acc[initial] = [];
    acc[initial].push(fornecedor);
    return acc;
  }, {}))
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([title, data]) => ({ title, data }));

  const handlePressItem = (fornecedor) => {
    navigation.navigate('PerfilFornecedor', { fornecedor });
  };

  
  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => handlePressItem(item)}
      style={styles.itemContainer}
    >
      <Image source={{ uri: item.imagemUri }} style={styles.imagemFornecedor} />
      <View style={styles.infoContainer}>
        <Text style={styles.nome}>{item.nome}</Text>
        <Text style={styles.texto}>{item.endereco || 'Endereço não disponível'}</Text>
        <Text style={styles.texto}>{item.telefone || 'Telefone não disponível'}</Text>
      </View>
    </TouchableOpacity>
  );

  
  const renderSectionHeader = ({ section: { title } }) => (
    <Text style={styles.sectionHeader}>{title}</Text>
  );

  
  const keyExtractor = (item) => item.id.toString();

  return (
    <View style={{ flex: 1 }}>
      <SectionList
        sections={sections}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        keyExtractor={keyExtractor}
      />
    </View>
  );
};

export default ListagemFornecedores;
