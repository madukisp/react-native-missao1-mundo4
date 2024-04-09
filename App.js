import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import CadastroFornecedor from './src/components/CadastroFornecedor';
import TelaInicial from './src/components/TelaInicial';
import ListagemFornecedores from './src/components/ListagemFornecedores';
import PerfilFornecedor from './src/components/PerfilFornecedor';

import { FornecedoresProvider } from './src/context/FornecedoresContext';

const colors = {
  background: '#688793',
  text: 'black',
};

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
            options={{ title: '' }}
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
          <Stack.Screen
            name="PerfilFornecedor"
            component={PerfilFornecedor}
            options={{ title: 'Perfil do Fornecedor' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </FornecedoresProvider>
  );
};

export default App;
