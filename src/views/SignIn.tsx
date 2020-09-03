import React, { useContext } from 'react';
import { View } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import Form from '../components/Form';
import { User } from '../interfaces/User';
import AuthService from '../services/AuthService';
import UserContext from '../contexts/UserContext/UserContext';

const fields = [
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
];

const SignIn = () => {
  const { setUser } = useContext(UserContext);

  const handleSignIn = async (data: { email: string; password: string }) => {
    try {
      const user: User = await AuthService.signIn(data.email, data.password);

      setUser(user, true);

      const jsonUser = JSON.stringify(user);

      await AsyncStorage.setItem('@lines_user', jsonUser);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View>
      <Form fields={fields} action={handleSignIn} actionName="Log in" />
    </View>
  );
};

export default SignIn;
