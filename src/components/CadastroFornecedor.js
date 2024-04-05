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
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled && result.assets) {
      setImagemUri(result.assets[0].uri);
    }
  };

  const abrirContatos = async () => {
    const { status } = await Contacts.requestPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permissão Necessária', 'É necessário conceder permissão para acessar os contatos.');
      return;
    }
    const { data } = await Contacts.getContactsAsync({
      fields: [Contacts.Fields.PhoneNumbers],
    });
    if (data.length > 0) {
      setContatos(data);
      setModalVisible(true);
    } else {
      Alert.alert('Nenhum Contato Encontrado', 'Nenhum contato foi encontrado em sua agenda.');
    }
  };

  const selecionarContato = (numero) => {
    setTelefone(numero);
    setModalVisible(false);
  };

  const handleSalvar = () => {
    if (!nome.trim() || !endereco.trim() || !telefone.trim() || !imagemUri) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos e selecione uma imagem.');
      return;
    }
    const novoFornecedor = {
      id: fornecedorParaEditar?.id,
      nome,
      endereco,
      telefone,
      imagemUri,
    };
    if (fornecedorParaEditar) {
      atualizarFornecedor(novoFornecedor);
    } else {
      adicionarFornecedor(novoFornecedor);
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
        keyboardType="phone-pad"
        style={styles.input}
      />
      <TouchableOpacity style={styles.botao} onPress={abrirContatos}>
        <Text style={styles.textoBotao}>Escolher da Agenda</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.botao} onPress={escolherImagem}>
        <Text style={styles.textoBotao}>Escolher Imagem</Text>
      </TouchableOpacity>
      {imagemUri && (
        <Image source={{ uri: imagemUri }} style={styles.imagemEscolhida} />
      )}
      <TouchableOpacity style={styles.botao} onPress={handleSalvar}>
        <Text style={styles.textoBotao}>{fornecedorParaEditar ? 'Atualizar' : 'Cadastrar'}</Text>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}
      >
        <View style={styles.centeredView}></View>
          <View style={styles.modalView}>
            <FlatList
              data={contatos}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.contactItem}
                  onPress={() => selecionarContato(item.phoneNumbers[0].number)}
                >
                  <Text style={styles.contactName}>{item.name}</Text>
                  {item.phoneNumbers && item.phoneNumbers.length > 0 && (
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
