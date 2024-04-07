import React from 'react';
import { FornecedoresProvider } from './src/context/FornecedoresContext';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import CadastroFornecedor from './src/components/CadastroFornecedor';
import TelaInicial from './src/components/TelaInicial';
import ListagemFornecedores from './src/components/ListagemFornecedores';
import { styles, colors } from './src/components/styles';
import PerfilFornecedor from './src/components/PerfilFornecedor';



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
          { }
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

import React, { useState, useContext, useEffect } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, Alert, Modal, FlatList } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Contacts from 'expo-contacts';
import { FornecedoresContext } from '../context/FornecedoresContext';
import { styles } from './styles';

const CadastroFornecedor = ({ navigation, route }) => {
  const { adicionarFornecedor, atualizarFornecedor } = useContext(FornecedoresContext);
  const fornecedorParaEditar = route.params?.fornecedor;

  
  const [nome, setNome] = useState(fornecedorParaEditar?.nome || '');
  const [endereco, setEndereco] = useState(fornecedorParaEditar?.endereco || '');
  const [telefone, setTelefone] = useState(fornecedorParaEditar?.telefone || '');
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

    const novoFornecedor = {
      id: route.params?.fornecedor?.id, 
      nome,
      endereco,
      telefone,
      imagemUri,
    };
  
    if (route.params?.fornecedor) {
      atualizarFornecedor(novoFornecedor);
    } else {
      adicionarFornecedor(novoFornecedor);
    }
  
    
    navigation.navigate('ListagemFornecedores');
  };

  return (
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
        <Text style={styles.textoBotao}>{fornecedorParaEditar ? 'Atualizar' : 'Cadastrar'}</Text>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}
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
  );
};

export default CadastroFornecedor;

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

import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const PerfilFornecedor = ({ route }) => {
  const { fornecedor } = route.params;

  return (
    <View style={styles.container}>
      <Image source={{ uri: fornecedor.imagemUri }} style={styles.imagem} />
      <Text style={styles.nome}>{fornecedor.nome}</Text>
      <Text style={styles.detalhe}>{fornecedor.endereco}</Text>
      <Text style={styles.detalhe}>{fornecedor.telefone}</Text>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imagem: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  nome: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  detalhe: {
    fontSize: 18,
    marginVertical: 4,
  },
  imagemFornecedorContainer: {
    marginBottom: 20,
  },
  imagemFornecedor: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
});

export default PerfilFornecedor;


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

import { StyleSheet } from 'react-native';

export const colors = {
  background: '#fdfd96', 
  borderColor: '#ff69b4', 
  buttonBackground: '#ff69b4', 
  buttonDanger: '#ff4500', 
  buttonSecondary: '#ffdf00', 
  buttonText: '#fff', 
  title: 'black', 
};

export const styles = StyleSheet.create({
  addButton: {
    position: 'absolute',
    right: 30,
    bottom: 30,
    backgroundColor: '#ff69b4',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
  },
  addButtonText: {
    fontSize: 30,
    color: '#fff',
  },
  actionButton: {
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    justifyContent: 'center',
    marginVertical: 2,
    minWidth: 80,
    padding: 10,
  },
  actionButtonContainer: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  actionButtonText: {
    color: '#333',
  },
  bordaExternaImagemFornecedor: {
    borderWidth: 2, 
    borderColor: 'black', 
    borderRadius: 30, 
    padding: 2, 
  },

  bordaInternaImagemFornecedor: {
    borderWidth: 2, 
    borderColor: '#ff69b4', 
    borderRadius: 26, 
    overflow: 'hidden', 
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
  botaoAlterar: {
    alignSelf: 'flex-end',
    backgroundColor: colors.buttonBackground,
    borderColor: '#000',
    borderRadius: 20,
    borderWidth: 2,
    marginVertical: 5,
    padding: 10,
  },
  botaoExcluir: {
    alignSelf: 'flex-end',
    backgroundColor: colors.buttonDanger,
    borderColor: '#000',
    borderRadius: 20,
    borderWidth: 2,
    marginVertical: 5,
    padding: 10,
  },
  botaoSecundario: {
    alignItems: 'center',
    backgroundColor: colors.buttonSecondary,
    borderColor: '#000',
    borderRadius: 20,
    borderWidth: 2,
    marginVertical: 10,
    padding: 10,
  },
  botaoTexto: {
    color: '#000',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonGroup: {
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    backgroundColor: "rgba(0,0,0,0.5)", 
  },
  contactImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  contactItem: {
    backgroundColor: 'white',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  contactName: {
    fontSize: 18, 
    fontWeight: 'bold',
  },
  contactNumber: {
    fontSize: 16, 
    color: 'gray',
  },
  container: {
    alignItems: 'center',
    backgroundColor: colors.background,
    flex: 1,
    justifyContent: 'center',
  },
  containerFornecedor: {
    backgroundColor: colors.background,
    padding: 20,
  },
  fornecedorImagemBorder: {
    backgroundColor: '#ff69b4', 
    borderRadius: 28, 
    padding: 2, 
  },
  fornecedorImagemWrapper: {
    backgroundColor: '#000', 
    borderRadius: 30, 
    justifyContent: 'center',
    alignItems: 'center',
    padding: 2, 
  },
  imagem: {
    borderColor: '#ff69b4',
    borderRadius: 50,
    borderWidth: 3,
    height: 100,
    width: 100,
  },
  imagemContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
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
  imagemEscolhidaInner: {
    borderColor: colors.borderColor,
    borderRadius: 75,
    borderWidth: 4,
    height: '100%',
    width: '100%',
  },
  imagemFornecedor: {
    width: 50, 
    height: 50, 
    borderRadius: 25, 
    resizeMode: 'cover', 
  },
  imagemFornecedorContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10, 
    marginVertical: 5,
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'center',
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
  item: {
    alignItems: 'center',
    borderBottomColor: colors.borderColor,
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    paddingRight: 20,
  },
  itemContainer: {
    backgroundColor: '#fff',
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  itemTextContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    alignSelf: 'center',
    borderColor: '#000',
    borderRadius: 52,
    borderWidth: 2,
    justifyContent: 'center',
    padding: 2,
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
  nome: {
    color: colors.title,
    fontWeight: 'bold',
  },
  sectionHeader: {
    backgroundColor: colors.buttonBackground,
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    padding: 10,
  },
  texto: {
    color: '#333',
  },
  titulo: {
    color: colors.title,
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
    textAlign: 'center',
  },
});
