import React, { useState, useContext, useEffect } from 'react';
import { View, Text, TextInput, SectionList, TouchableOpacity, Image, Alert } from 'react-native';
import { FornecedoresContext } from '../context/FornecedoresContext';
import { styles } from './styles';
import { Ionicons } from '@expo/vector-icons';

const ListagemFornecedores = ({ navigation }) => {
  const { fornecedores, excluirFornecedor } = useContext(FornecedoresContext);
  const [termoFiltro, setTermoFiltro] = useState('');
  const [listaFiltrada, setListaFiltrada] = useState([]);

  useEffect(() => {
    if (termoFiltro) {
      const novaListaFiltrada = fornecedores.filter(
        fornecedor => fornecedor.nome.toLowerCase().includes(termoFiltro.toLowerCase()) ||
                      (fornecedor.categoria && fornecedor.categoria.toLowerCase().includes(termoFiltro.toLowerCase()))
      );
      agruparFornecedores(novaListaFiltrada);
    } else {
      agruparFornecedores(fornecedores);
    }
  }, [termoFiltro, fornecedores]);

  const agruparFornecedores = (fornecedoresParaAgrupar) => {
    const grupos = fornecedoresParaAgrupar.reduce((acc, fornecedor) => {
      const letra = fornecedor.nome[0].toUpperCase();
      if (!acc[letra]) {
        acc[letra] = { title: letra, data: [] };
      }
      acc[letra].data.push(fornecedor);
      return acc;
    }, {});
    setListaFiltrada(Object.values(grupos).sort((a, b) => a.title.localeCompare(b.title)));
  };

  const handlePressItem = (fornecedor) => {
    navigation.navigate('PerfilFornecedor', { fornecedor });
  };

  const handleAlterar = (fornecedor) => {
    navigation.navigate('CadastroFornecedor', { fornecedor });
  };

  const handleExcluir = (id) => {
    Alert.alert('Excluir Fornecedor', 'Deseja mesmo excluir este fornecedor?', [
      { text: 'Não', style: 'cancel' },
      { text: 'Sim', onPress: () => excluirFornecedor(id) },
    ]);
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <TouchableOpacity onPress={() => handlePressItem(item)} style={styles.itemTouchable}>
        <Image source={{ uri: item.imagemUri }} style={styles.imagemFornecedor} />
        <View style={styles.infoContainer}>
          <Text style={styles.nomeFornecedor}>{item.nome}</Text>
          <Text style={styles.textoFornecedor}>{item.endereco || 'Endereço não disponível'}</Text>
          <Text style={styles.textoFornecedor}>{item.telefone || 'Telefone não disponível'}</Text>
          <Text style={styles.categoriaFornecedor}>{item.categoria || 'Categoria não definida'}</Text>
        </View>
      </TouchableOpacity>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={() => handleAlterar(item)} style={styles.botaoAlterar}>
          <Text style={styles.botaoTexto}>Alterar</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleExcluir(item.id)} style={styles.botaoExcluir}>
          <Text style={styles.botaoTexto}>Excluir</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderSectionHeader = ({ section: { title } }) => (
    <Text style={styles.sectionHeader}>{title}</Text>
  );

  const keyExtractor = (item) => item.id.toString();

  return (
    <View style={styles.containerListagem}>
      <TextInput
        style={styles.inputBusca}
        placeholder="Buscar por nome ou categoria"
        onChangeText={setTermoFiltro}
        value={termoFiltro}
      />
      <SectionList
        sections={listaFiltrada}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        keyExtractor={keyExtractor}
      />
      <TouchableOpacity
        style={styles.botaoAdicionar}
        onPress={() => navigation.navigate('CadastroFornecedor')}
      >
        <Ionicons name="add-circle-outline" size={50} color="green" />
      </TouchableOpacity>
    </View>
  );
};

export default ListagemFornecedores;
