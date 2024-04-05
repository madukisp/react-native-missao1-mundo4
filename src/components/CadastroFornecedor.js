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
    let resultado = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

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
