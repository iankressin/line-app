import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';

import { User, UserState } from '../../interfaces/User';
import UserContext from './UserContext';

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const setUser = (user: User, isSignIn: boolean) => {
    updateUser((prevState) => {
      return { isSignIn, user, setUser: prevState.setUser };
    });
  };

  const userState: UserState = {
    user: {},
    isSignIn: false,
    setUser,
  };

  const [user, updateUser] = useState(userState);

  useEffect(() => {
    AsyncStorage.getItem('@lines_user').then((data: string | null) => {
      console.log('Got this data', data);
      if (data) {
        const userFromStorage = JSON.parse(data);
        updateUser({ isSignIn: true, user: userFromStorage, setUser });
      }
    });
  }, []);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

export default UserProvider;
