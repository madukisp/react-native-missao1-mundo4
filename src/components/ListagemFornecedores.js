import React, { useState, useContext, useEffect } from 'react';
import { View, TextInput, SectionList, TouchableOpacity, Image, Alert, Text } from 'react-native';
import { FornecedoresContext } from '../context/FornecedoresContext';
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/ListagemFornecedoresStyles';

const ListagemFornecedores = ({ navigation }) => {
  const { fornecedores, excluirFornecedor } = useContext(FornecedoresContext);
  const [termoFiltro, setTermoFiltro] = useState('');
  const [agrupamento, setAgrupamento] = useState('alfabetica');
  const [listaFiltrada, setListaFiltrada] = useState([]);

  useEffect(() => {
    filtrarEAgruparFornecedores();
  }, [termoFiltro, fornecedores, agrupamento]);

  const filtrarEAgruparFornecedores = () => {
    const listaFiltrada = termoFiltro ? fornecedores.filter(
      fornecedor => fornecedor.nome.toLowerCase().includes(termoFiltro.toLowerCase()) ||
                    (fornecedor.categoria && fornecedor.categoria.toLowerCase().includes(termoFiltro.toLowerCase()))
    ) : fornecedores;

    agruparFornecedores(listaFiltrada);
  };

  const agruparFornecedores = (lista) => {
    let grupos = {};
    if (agrupamento === 'alfabetica') {
      grupos = lista.reduce((acc, fornecedor) => {
        const letraInicial = fornecedor.nome[0].toUpperCase();
        if (!acc[letraInicial]) {
          acc[letraInicial] = { title: letraInicial, data: [] };
        }
        acc[letraInicial].data.push(fornecedor);
        return acc;
      }, {});
    } else {
      grupos = lista.reduce((acc, fornecedor) => {
        const categoria = fornecedor.categoria || 'Outros';
        if (!acc[categoria]) {
          acc[categoria] = { title: categoria, data: [] };
        }
        acc[categoria].data.push(fornecedor);
        return acc;
      }, {});
    }
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

  const keyExtractor = (item) => item.id.toString();

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <TouchableOpacity onPress={() => handlePressItem(item)} style={styles.itemTouchable}>
        <Image source={{ uri: item.imagemUri || 'path/to/your/default/image.png' }} style={styles.imagemFornecedor} />
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
        ListFooterComponent={<View style={{ height: 80 }} />}
      />
      <TouchableOpacity
        style={styles.botaoAdicionar}
        onPress={() => navigation.navigate('CadastroFornecedor')}
      >
        <Ionicons name="add-circle-outline" size={50} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default ListagemFornecedores;
