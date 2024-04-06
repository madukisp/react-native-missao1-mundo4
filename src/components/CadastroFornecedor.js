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
