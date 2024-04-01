import React, { useState } from 'react';
import { View, Text, TextInput, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { TouchableOpacity } from 'react-native';
import styles from '../styles/CadastroFornecedorStyles';

const CadastroFornecedor = ({ onCadastro }) => {
    const [nome, setNome] = useState('');
    const [endereco, setEndereco] = useState('');
    const [telefone, setTelefone] = useState('');
    const [imagemUri, setImagemUri] = useState('');

    const escolherImagem = async () => {
        let resultado = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!resultado.cancelled) {
            const uri = resultado.assets[0].uri;
            console.log("Imagem URI:", uri);
            setImagemUri(uri);
        }
    };

    const handleCadastro = () => {
        if (nome && endereco && telefone && imagemUri) {
            onCadastro({ nome, endereco, telefone, imagemUri });
            setNome('');
            setEndereco('');
            setTelefone('');
            setImagemUri(null);
        } else {
            alert('Por favor, preencha todos os campos e selecione uma imagem.');
        }
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
            {imagemUri && (
                <Image source={{ uri: imagemUri }} style={styles.image} />
            )}
            <TouchableOpacity style={styles.button} onPress={handleCadastro}>
                <Text style={styles.buttonText}>Cadastrar</Text>
            </TouchableOpacity>
        </View>
    );
};

export default CadastroFornecedor;
