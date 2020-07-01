import React from 'react';
import { View, Text } from 'react-native';


import Form from '../components/Form';
import { User } from '../interfaces/User';
import UserService from '../services/UserService';
import { navigate } from '../services/NavigationService';

const fields = [
  {
    field: 'name',
    name: 'Nome',
    type: 'text',
  },
  {
    field: 'lastName',
    name: 'Sobrenome',
    type: 'text',
  },
  {
    field: 'email',
    name: 'Email',
    type: 'email',
  },
  {
    field: 'password',
    name: 'Senha',
    type: 'password',
  },
  {
    field: 'age',
    name: 'Idade',
    type: 'number',
  },
  {
    field: 'document',
    name: 'Documento ( CPF ou RG )',
    type: 'text',
  },
];

const SignUp = () => {
  const handleSignUp = async (data: User) => {
    try {
      await UserService.create(data);

      navigate('SignIn');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View>
      <Form fields={fields} actionName="Cadastrar" action={handleSignUp} />
    </View>
  );
};

export default SignUp;
