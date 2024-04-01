import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import CadastroFornecedor from './src/components/CadastroFornecedor';
import ListagemFornecedores from './src/components/ListagemFornecedores';

const App = () => {
  const [fornecedores, setFornecedores] = useState([]);
  const [fornecedorEditando, setFornecedorEditando] = useState(null);

  const adicionarFornecedor = (fornecedor) => {
    setFornecedores((currentFornecedores) => [
      ...currentFornecedores,
      { ...fornecedor, id: Math.random().toString() },
    ]);
  };

  const excluirFornecedor = (id) => {
    Alert.alert(
      "Confirmar exclusão",
      "Deseja realmente excluir este fornecedor?",
      [
        { text: "Cancelar" },
        {
          text: "Excluir",
          onPress: () => {
            setFornecedores((currentFornecedores) =>
              currentFornecedores.filter((fornecedor) => fornecedor.id !== id)
            );
          },
        },
      ]
    );
  };

  const atualizarFornecedor = (fornecedor) => {
    setFornecedores((currentFornecedores) => 
      currentFornecedores.map((f) => (f.id === fornecedor.id ? fornecedor : f))
    );
    setFornecedorEditando(null);
  };

  const iniciarEdicaoFornecedor = (id) => {
    const fornecedor = fornecedores.find((f) => f.id === id);
    setFornecedorEditando(fornecedor);
  };

  return (
    <View style={styles.container}>
      <CadastroFornecedor 
        onCadastro={adicionarFornecedor} 
        fornecedorEditando={fornecedorEditando}
        onAtualizarFornecedor={atualizarFornecedor}
      />
      <ListagemFornecedores
        fornecedores={fornecedores}
        onExcluir={excluirFornecedor}
        onAtualizar={iniciarEdicaoFornecedor}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
  },
});

export default App;
