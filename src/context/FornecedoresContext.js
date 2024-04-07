import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const FornecedoresContext = createContext();

export const FornecedoresProvider = ({ children }) => {
  const [fornecedores, setFornecedores] = useState([]);

  useEffect(() => {
    carregarFornecedores();
  }, []);

  const salvarFornecedores = async (updatedFornecedores) => {
    try {
      const jsonValue = JSON.stringify(updatedFornecedores);
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
      const updatedFornecedores = [
        ...currentFornecedores,
        {
          ...novoFornecedor,
          id: Math.random().toString(),
          categoria: novoFornecedor.categoria || 'Sem Categoria', 
        }
      ];
      salvarFornecedores(updatedFornecedores);
      return updatedFornecedores;
    });
  };

  const atualizarFornecedor = (fornecedorAtualizado) => {
    setFornecedores(currentFornecedores => {
      const updatedFornecedores = currentFornecedores.map(fornecedor => 
        fornecedor.id === fornecedorAtualizado.id ? { ...fornecedor, ...fornecedorAtualizado } : fornecedor
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
