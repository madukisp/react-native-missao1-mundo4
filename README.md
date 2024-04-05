import React from 'react';
import { FornecedoresProvider } from './src/context/FornecedoresContext';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import CadastroFornecedor from './src/components/CadastroFornecedor';
import TelaInicial from './src/components/TelaInicial';
import ListagemFornecedores from './src/components/ListagemFornecedores';
import FornecedorProfile from './src/components/FornecedorProfile';
import { styles, colors } from './src/components/styles';



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
          {}
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


import React, { useState, useContext, useEffect } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { FornecedoresContext } from '../context/FornecedoresContext';
import { styles, colors } from './styles';

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
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
  
    if (!result.cancelled) {
      setImagemUri(result.assets[0].uri);
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

      {}
      <TextInput
        placeholder="Nome do Fornecedor"
        value={nome}
        onChangeText={setNome}
        style={[styles.input, { width: '80%', alignSelf: 'center' }]}
      />
      <TextInput
        placeholder="Endereço"
        value={endereco}
        onChangeText={setEndereco}
        style={[styles.input, { width: '80%', alignSelf: 'center' }]}
      />
      <TextInput
        placeholder="Telefone"
        value={telefone}
        onChangeText={setTelefone}
        style={[styles.input, { width: '80%', alignSelf: 'center' }]}
      />

      <TouchableOpacity style={styles.botao} onPress={escolherImagem}>
        <Text style={styles.textoBotao}>Escolher Imagem</Text>
      </TouchableOpacity>

      {}
      {imagemUri ? (
        <View style={styles.imagemEscolhida}>
          <Image source={{ uri: imagemUri }} style={styles.imagemEscolhidaInner} />
        </View>
      ) : null}

      <TouchableOpacity style={styles.botao} onPress={handleSalvar}>
        <Text style={styles.textoBotao}>{fornecedorParaEditar ? 'Atualizar' : 'Cadastrar'}</Text>
      </TouchableOpacity>
    </View>
  );
};

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
import { View, Image } from 'react-native';
import { styles, colors } from './styles';

const ImagemFornecedor = ({ uri }) => {
  return (
    <View style={styles.containerImagemFornecedor}> {}
      <Image source={{ uri }} style={styles.imagemFornecedor} /> {}
    </View>
  );
};

export default ImagemFornecedor;


import React, { useContext } from 'react';
import { SectionList, View, Text, Image, TouchableOpacity, Alert } from 'react-native';
import { FornecedoresContext } from '../context/FornecedoresContext';
import { styles } from './styles';

const ListagemFornecedores = ({ navigation }) => {
  const { fornecedores, excluirFornecedor } = useContext(FornecedoresContext);

  const sectionData = Object.entries(fornecedores.reduce((acc, fornecedor) => {
    const initial = fornecedor.nome[0].toUpperCase();
    if (!acc[initial]) {
      acc[initial] = [];
    }
    acc[initial].push(fornecedor);
    return acc;
  }, {}))
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
          <Image
            source={{ uri: item.imagemUri }}
            style={styles.imagemFornecedor}
          />
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
      keyExtractor={(item, index) => `list-item-${index}`}
    />
  );
};

export default ListagemFornecedores;



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
