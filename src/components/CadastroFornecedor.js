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
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Contacts from 'expo-contacts';
import { FornecedoresContext } from '../context/FornecedoresContext';
import { Picker } from '@react-native-picker/picker';
import styles from '../styles/CadastroFornecedorStyles';
import { SafeAreaView } from 'react-native-safe-area-context';

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
    const permissionsResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionsResult.granted === false) {
      alert('Permissão de acesso à galeria é necessária!');
      return;
    }

    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.cancelled && result.assets) {
        setImagemUri(result.assets[0].uri);
      }
    } catch (error) {
      console.log(error);
      Alert.alert('Erro', 'Não foi possível selecionar a imagem.');
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
    const id = fornecedorParaEditar?.id || Date.now().toString();
    const novoFornecedor = {
      id,
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

    // Resetar o formulário para os valores padrões
    setNome('');
    setEndereco('');
    setTelefone('');
    setCategoria('');
    setImagemUri('');
    setModalVisible(false);

    navigation.navigate('ListagemFornecedores');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
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
            onValueChange={setCategoria}
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
                      <View style={styles.placeholderImage} />
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
    </SafeAreaView>
  );
};

export default CadastroFornecedor;
