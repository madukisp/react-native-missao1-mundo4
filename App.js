import React, { useState } from 'react';
import { View, Alert } from 'react-native';
import CadastroFornecedor from './src/components/CadastroFornecedor';
import ListagemFornecedores from './src/components/ListagemFornecedores';
import styles from './src/styles/AppStyles';

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

  return (
    <View style={styles.container}>
      <CadastroFornecedor 
        onCadastro={adicionarFornecedor} 
        fornecedorEditando={fornecedorEditando}
      />
      <ListagemFornecedores
        fornecedores={fornecedores}
        onExcluir={excluirFornecedor}
      />
    </View>
  );
};

export default App;

