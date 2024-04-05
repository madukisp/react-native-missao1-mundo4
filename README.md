import React from 'react';
import { FornecedoresProvider } from './src/context/FornecedoresContext';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet } from 'react-native';

import CadastroFornecedor from './src/components/CadastroFornecedor';
import TelaInicial from './src/components/TelaInicial';
import ListagemFornecedores from './src/components/ListagemFornecedores';
import FornecedorProfile from './src/components/FornecedorProfile';

const Stack = createStackNavigator();

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: '#b595d9',
    color: '#fff',
  },
});

const App = () => {
  return (
    <FornecedoresProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="TelaInicial">
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
            component={FornecedorProfile}
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

  const salvarFornecedores = async () => {
    try {
      const jsonValue = JSON.stringify(fornecedores);
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
      const updatedFornecedores = [...currentFornecedores, { ...novoFornecedor, id: Math.random().toString() }];
      salvarFornecedores(updatedFornecedores);
      return updatedFornecedores;
    });
  };

  const atualizarFornecedor = (fornecedorAtualizado) => {
    setFornecedores(currentFornecedores => {
      const updatedFornecedores = currentFornecedores.map(fornecedor => 
        fornecedor.id === fornecedorAtualizado.id ? fornecedorAtualizado : fornecedor
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



import React, { useState, useContext, useEffect } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { FornecedoresContext } from '../context/FornecedoresContext';

const CadastroFornecedor = ({ navigation, route }) => {
  const { adicionarFornecedor, atualizarFornecedor } = useContext(FornecedoresContext);
  const fornecedorParaEditar = route.params?.fornecedor;

  const [nome, setNome] = useState(fornecedorParaEditar?.nome || '');
  const [endereco, setEndereco] = useState(fornecedorParaEditar?.endereco || '');
  const [telefone, setTelefone] = useState(fornecedorParaEditar?.telefone || '');
  const [imagemUri, setImagemUri] = useState(fornecedorParaEditar?.imagemUri || '');

  useEffect(() => {
    if (fornecedorParaEditar) {
      navigation.setOptions({ title: 'Editar Fornecedor' });
    }
  }, [fornecedorParaEditar, navigation]);

  const escolherImagem = async () => {
    let resultado = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
  
    // Certifique-se de que esta linha usa 'cancelled' em minúsculas.
    if (!resultado.cancelled && resultado.assets) {
      setImagemUri(resultado.assets[0].uri);
    }
  };
  
  
  
  

  const handleSalvar = () => {
    if (!nome || !endereco || !telefone || !imagemUri) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos e selecione uma imagem.');
      return;
    }

    if (fornecedorParaEditar) {
      atualizarFornecedor({ id: fornecedorParaEditar.id, nome, endereco, telefone, imagemUri });
    } else {
      adicionarFornecedor({ nome, endereco, telefone, imagemUri });
    }

    navigation.goBack();
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
        placeholder="Endereço"
        value={endereco}
        onChangeText={setEndereco}
        style={styles.input}
      />
      <TextInput
        placeholder="Telefone"
        value={telefone}
        onChangeText={setTelefone}
        style={styles.input}
      />
      <TouchableOpacity style={styles.button} onPress={escolherImagem}>
        <Text style={styles.buttonText}>Escolher Imagem</Text>
      </TouchableOpacity>
      {imagemUri ? (
        <Image source={{ uri: imagemUri }} style={styles.image} />
      ) : null}
      <TouchableOpacity style={styles.button} onPress={handleSalvar}>
        <Text style={styles.buttonText}>{fornecedorParaEditar ? 'Atualizar' : 'Cadastrar'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
        color: '#fff',
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 8,
    },
    image: {
        width: 100,
        height: 100,
        marginBottom: 10,
    },
    titulo: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,        
    },
    button: {
        backgroundColor: '#7e41f6',
        padding: 10,
        borderRadius: 18,
        marginBottom: 10,
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: 'bold',
    },
});

export default CadastroFornecedor;


import React, { useState, useEffect } from 'react';
import { Button, Image, View, Platform, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function FornecedorProfile() {
  const [image, setImage] = useState(null);

  useEffect(() => {
    getPermissionAsync();
  }, []);

  async function getPermissionAsync() {
    if (Platform.OS !== 'web') {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Desculpe, precisamos das permissões da câmera para fazer isso funcionar!');
      }
    }
  }

  async function pickImage() {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  }
  
  async function takePhoto() {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  }

  return (
    <View style={styles.container}>
      <Button title="Selecionar uma imagem da galeria" onPress={pickImage} />
      <Button title="Tirar uma foto" onPress={takePhoto} />
      {image && <Image source={{ uri: image }} style={styles.image} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 200,
    height: 200,
  },
});


import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const ImagemFornecedor = ({ uri }) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri }} style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 10,
  },
  image: {
    width: 100,
    height: 100,
  },
});

export default ImagemFornecedor;



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



import React from 'react';
import { View, Text, Image, Button, StyleSheet } from 'react-native';


const TelaInicial = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.nome}>Meeting</Text>
      <Image
        source={require('../../assets/icon.png')}
        style={styles.logo}
      />
      <Button
        title="Cadastrar"
        onPress={() => navigation.navigate('CadastroFornecedor')}
      />
      <Button
        title="Consultar"
        onPress={() => navigation.navigate('ListagemFornecedores')}
      />
      <Button
        title="Perfil do Fornecedor"
        onPress={() => navigation.navigate('PerfilFornecedor')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  nome: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  logo: {
    width: 150, 
    height: 150, 
    marginBottom: 20,
  },
});

export default TelaInicial;