import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

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
          setImagemUri(null); // Limpando após cadastro
        } else {
          alert('Por favor, preencha todos os campos e selecione uma imagem.');
        }
      };
      


    return (
        <View style={styles.container}>
            <Text>Cadastro de Fornecedor</Text>
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
            <Button title="Escolher Imagem" onPress={escolherImagem} />
            {imagemUri && (
                <Image source={{ uri: imagemUri }} style={{ width: 100, height: 100 }} />
            )}

            <Button title="Cadastrar" onPress={handleCadastro} />

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
    },
    image: {
        width: 100,
        height: 100,
        marginBottom: 10,
    },
});

export default CadastroFornecedor;
