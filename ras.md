tenho um projeto de react native e preciso da sua ajuda para dar alguns retoques, vou lhe mostrar os códigos e depois irei fazer perguntas

import React from 'react';
import { FornecedoresProvider } from './src/context/FornecedoresContext';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';

import CadastroFornecedor from './src/components/CadastroFornecedor';
import TelaInicial from './src/components/TelaInicial';
import ListagemFornecedores from './src/components/ListagemFornecedores';
import PerfilFornecedor from './src/components/PerfilFornecedor';

const colors = {
  background: '#fdfd96',
  text: 'black',
};

const Stack = createStackNavigator();

const App = () => {
  return (
    <FornecedoresProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="TelaInicial"
          screenOptions={{
            headerStyle: {
              backgroundColor: colors.background,
            },
            headerTintColor: colors.text,
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        >
          <Stack.Screen
            name="TelaInicial"
            component={TelaInicial}
            options={{ title: 'Tela Inicial' }}
          />
          <Stack.Screen
            name="CadastroFornecedor"
            component={CadastroFornecedor}
            options={{ title: 'Cadastro de Fornecedor' }}
          />
          <Stack.Screen
            name="ListagemFornecedores"
            component={ListagemFornecedores}
            options={{ title: 'Listagem de Fornecedores' }}
          />
          <Stack.Screen
            name="PerfilFornecedor"
            component={PerfilFornecedor}
            options={{ title: 'Perfil do Fornecedor' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </FornecedoresProvider>
  );
};

export default App;
import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const FornecedoresContext = createContext();

export const FornecedoresProvider = ({ children }) => {
  const [fornecedores, setFornecedores] = useState([]);

  useEffect(() => {
    carregarFornecedores();
  }, []);

  const salvarFornecedores = async (updatedFornecedores) => {
    try {
      const jsonValue = JSON.stringify(updatedFornecedores);
      await AsyncStorage.setItem('@fornecedores', jsonValue);
    } catch (e) {
      console.error('Erro ao salvar os fornecedores', e);
    }
  };

  const carregarFornecedores = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@fornecedores');
      setFornecedores(jsonValue != null ? JSON.parse(jsonValue) : []);
    } catch(e) {
      console.error('Erro ao carregar os fornecedores', e);
    }
  };

  const adicionarFornecedor = (novoFornecedor) => {
    setFornecedores(currentFornecedores => {
      const updatedFornecedores = [
        ...currentFornecedores,
        {
          ...novoFornecedor,
          id: Math.random().toString(),
          categoria: novoFornecedor.categoria || 'Sem Categoria', 
        }
      ];
      salvarFornecedores(updatedFornecedores);
      return updatedFornecedores;
    });
  };

  const atualizarFornecedor = (fornecedorAtualizado) => {
    setFornecedores(currentFornecedores => {
      const updatedFornecedores = currentFornecedores.map(fornecedor => 
        fornecedor.id === fornecedorAtualizado.id ? { ...fornecedor, ...fornecedorAtualizado } : fornecedor
      );
      salvarFornecedores(updatedFornecedores);
      return updatedFornecedores;
    });
  };

  const excluirFornecedor = (id) => {
    setFornecedores(currentFornecedores => {
      const updatedFornecedores = currentFornecedores.filter(fornecedor => fornecedor.id !== id);
      salvarFornecedores(updatedFornecedores);
      return updatedFornecedores;
    });
  };

  return (
    <FornecedoresContext.Provider value={{ fornecedores, adicionarFornecedor, atualizarFornecedor, excluirFornecedor }}>
      {children}
    </FornecedoresContext.Provider>
  );
};


import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';

const colors = {
  background: '#fdfd96', 
  buttonBackground: '#ff69b4', 
  buttonText: '#fff', 
  title: 'black', 
};

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: colors.title,
  },
  logoContainer: {
    marginBottom: 30,
  },
  imagem: {
    width: 200,
    height: 200,
  },
  botao: {
    backgroundColor: colors.buttonBackground,
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  botaoTexto: {
    color: colors.buttonText,
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default TelaInicial;

import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const colors = {
  background: '#fdfd96', 
  borderColor: '#ff69b4', 
  buttonText: '#fff', 
  title: 'black', 
};

const PerfilFornecedor = ({ route }) => {
  const { fornecedor } = route.params;

  return (
    <View style={styles.container}>
      <Image source={{ uri: fornecedor.imagemUri }} style={styles.imagem} />
      <Text style={styles.nome}>{fornecedor.nome}</Text>
      <Text style={styles.detalhe}>{fornecedor.endereco || 'Endereço não disponível'}</Text>
      <Text style={styles.detalhe}>{fornecedor.telefone || 'Telefone não disponível'}</Text>
      <Text style={styles.detalhe}>{fornecedor.categoria || 'Categoria não definida'}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: colors.background,
  },
  imagem: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 8,
  },
  nome: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 8,
    color: colors.title,
  },
  detalhe: {
    fontSize: 18,
    marginVertical: 4,
    color: '#333',
  },
});

export default PerfilFornecedor;

import React, { useState, useContext, useEffect } from 'react';
import { View, Text, TextInput, SectionList, TouchableOpacity, Image, Alert, StyleSheet } from 'react-native';
import { FornecedoresContext } from '../context/FornecedoresContext';
import { Ionicons } from '@expo/vector-icons';

const colors = {
  background: '#fdfd96', 
  borderColor: '#ff69b4', 
  buttonBackground: '#ff69b4', 
  buttonDelete: '#ff4500', 
  buttonSecondary: '#ffdf00', 
  buttonText: '#fff', 
  title: 'black', 
};

const styles = StyleSheet.create({
  containerListagem: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: 10,
  },
  inputBusca: {
    backgroundColor: '#fff',
    borderColor: colors.borderColor,
    borderRadius: 10,
    borderWidth: 1,
    margin: 10,
    padding: 10,
  },
  itemContainer: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderBottomColor: colors.borderColor,
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  itemTouchable: {
    flexDirection: 'row',
  },
  infoContainer: {
    flex: 1,
    paddingLeft: 10,
  },
  nomeFornecedor: {
    color: colors.title,
    fontSize: 18,
    fontWeight: 'bold',
  },
  textoFornecedor: {
    color: '#333',
  },
  categoriaFornecedor: {
    color: '#666',
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  botaoAlterar: {
    alignItems: 'center',
    backgroundColor: colors.buttonBackground,
    borderColor: '#000',
    borderRadius: 20,
    borderWidth: 2,
    marginVertical: 5,
    padding: 10,
    marginRight: 5,
  },
  botaoExcluir: {
    alignItems: 'center',
    backgroundColor: colors.buttonDelete,
    borderColor: '#000',
    borderRadius: 20,
    borderWidth: 2,
    marginVertical: 5,
    padding: 10,
    marginLeft: 5,
  },
  botaoTexto: {
    color: colors.buttonText,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  sectionHeader: {
    backgroundColor: colors.buttonBackground,
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    padding: 10,
  },
  botaoAdicionar: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: 20,
    bottom: 20,
  },
});

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

import React, { useState, useContext, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  Alert,
  Modal,
  FlatList,
  ScrollView,
  StyleSheet
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Contacts from 'expo-contacts';
import { FornecedoresContext } from '../context/FornecedoresContext';

const colors = {
  background: '#fdfd96', 
  borderColor: '#ff69b4', 
  buttonBackground: '#ff69b4', 
  buttonDelete: '#ff4500', 
  buttonSecondary: '#ffdf00', 
  buttonText: '#fff', 
  title: 'black', 
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: colors.background,
    flex: 1,
    justifyContent: 'center',
  },
  titulo: {
    color: colors.title,
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
    textAlign: 'center',
  },
  input: {
    alignSelf: 'center',
    backgroundColor: '#fff',
    borderColor: colors.buttonBackground,
    borderRadius: 10,
    borderWidth: 1,
    height: 40,
    marginVertical: 10,
    padding: 10,
    width: '80%',
  },
  label: {
    fontSize: 16,
    color: 'black',
    marginTop: 10,
  },
  picker: {
    height: 50,
    width: '100%',
  },
  botao: {
    alignSelf: 'center',
    backgroundColor: colors.buttonBackground,
    borderColor: '#000',
    borderRadius: 20,
    borderWidth: 2,
    marginVertical: 10,
    paddingVertical: 10,
    paddingHorizontal: 30,
    width: '80%',
  },
  textoBotao: {
    color: colors.buttonText,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  textoBotaoSalvar: {
    color: colors.buttonText,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  imagemEscolhida: {
    alignSelf: 'center',
    borderColor: 'black',
    borderRadius: 75,
    borderWidth: 3,
    height: 150,
    marginBottom: 20,
    marginTop: 20,
    overflow: 'hidden',
    width: 150,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  contactImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  modalItem: {
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    flexDirection: 'row',
    padding: 10,
  },
  placeholderImage: {
    backgroundColor: 'gray',
    borderRadius: 25,
    height: 50,
    width: 50,
  },
  contactName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  contactNumber: {
    fontSize: 16,
    color: 'gray',
    marginLeft: 10,
  },
});

const CadastroFornecedor = ({ navigation, route }) => {
  const { adicionarFornecedor, atualizarFornecedor } = useContext(FornecedoresContext);
  const fornecedorParaEditar = route.params?.fornecedor;
  
  const [nome, setNome] = useState(fornecedorParaEditar?.nome || '');
  const [endereco, setEndereco] = useState(fornecedorParaEditar?.endereco || '');
  const [telefone, setTelefone] = useState(fornecedorParaEditar?.telefone || '');
  const [categoria, setCategoria] = useState(fornecedorParaEditar?.categoria || '');
  const [imagemUri, setImagemUri] = useState(fornecedorParaEditar?.imagemUri || '');
  const [modalVisible, setModalVisible] = useState(false);
  const [contatos, setContatos] = useState([]);

  useEffect(() => {
    if (fornecedorParaEditar) {
      navigation.setOptions({ title: 'Editar Fornecedor' });
    }
  }, [fornecedorParaEditar, navigation]);

  const escolherImagem = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      setImagemUri(result.uri);
    }
  };

  const abrirContatos = async () => {
    const { status } = await Contacts.requestPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permissão Necessária', 'É necessário conceder permissão para acessar os contatos.');
      return;
    }

    const { data } = await Contacts.getContactsAsync({
      fields: [Contacts.Fields.PhoneNumbers, Contacts.Fields.Addresses, Contacts.Fields.Image],
    });

    if (data.length > 0) {
      setContatos(data);
      setModalVisible(true);
    } else {
      Alert.alert('Nenhum Contato Encontrado', 'Nenhum contato foi encontrado em sua agenda.');
    }
  };

  const selecionarContato = (contato) => {
    setNome(contato.name);
    setTelefone(contato.phoneNumbers?.[0]?.number ?? '');
    setEndereco(contato.addresses?.[0]?.street ?? '');
    setImagemUri(contato.imageAvailable && contato.image?.uri ? contato.image.uri : '');
    setModalVisible(false);
  };

  const handleSalvar = () => {
    if (!nome.trim() || !telefone.trim()) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    const categoriaCapitalizada = categoria.charAt(0).toUpperCase() + categoria.slice(1);

    const novoFornecedor = {
      id: fornecedorParaEditar?.id || Date.now().toString(),
      nome,
      endereco,
      telefone,
      imagemUri,
      categoria: categoriaCapitalizada,
    };

    if (fornecedorParaEditar) {
      atualizarFornecedor(novoFornecedor);
    } else {
      adicionarFornecedor(novoFornecedor);
    }

    navigation.goBack();
  };

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <Text style={styles.titulo}>Cadastro de Fornecedor</Text>
        <TextInput
          placeholder="Nome do Fornecedor"
          value={nome}
          onChangeText={setNome}
          style={styles.input}
        />
        <TextInput
          placeholder="Endereço (opcional)"
          value={endereco}
          onChangeText={setEndereco}
          style={styles.input}
        />
        <TextInput
          placeholder="Telefone"
          value={telefone}
          onChangeText={setTelefone}
          keyboardType="phone-pad"
          style={styles.input}
        />
        <Text style={styles.label}>Categoria:</Text>
        <Picker
          selectedValue={categoria}
          onValueChange={(itemValue) => setCategoria(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Sem Categoria" value="" />
          <Picker.Item label="Eletrônicos" value="eletronicos" />
          <Picker.Item label="Vestuário" value="vestuario" />
          <Picker.Item label="Alimentação" value="alimentacao" />
          <Picker.Item label="Outros" value="outros" />
        </Picker>
        <TouchableOpacity style={styles.botao} onPress={abrirContatos}>
          <Text style={styles.textoBotao}>Escolher da Agenda</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.botao} onPress={escolherImagem}>
          <Text style={styles.textoBotao}>Escolher Imagem</Text>
        </TouchableOpacity>
        {imagemUri ? (
          <Image source={{ uri: imagemUri }} style={styles.imagemEscolhida} />
        ) : null}
        <TouchableOpacity style={styles.botao} onPress={handleSalvar}>
          <Text style={styles.textoBotaoSalvar}>Cadastrar Fornecedor</Text>
        </TouchableOpacity>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalView}>
            <FlatList
              data={contatos}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => selecionarContato(item)} style={styles.modalItem}>
                  {item.imageAvailable && item.image?.uri ? (
                    <Image source={{ uri: item.image.uri }} style={styles.contactImage} />
                  ) : (
                    <View style={styles.placeholderImage}></View>
                  )}
                  <Text style={styles.contactName}>{item.name}</Text>
                  {item.phoneNumbers && (
                    <Text style={styles.contactNumber}>{item.phoneNumbers[0].number}</Text>
                  )}
                </TouchableOpacity>
              )}
            />
          </View>
        </Modal>
      </View>
    </ScrollView>
  );
};

export default CadastroFornecedor;

