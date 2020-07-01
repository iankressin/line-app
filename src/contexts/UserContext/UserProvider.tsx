import React, { useState } from 'react';

import { User, UserState } from '../../interfaces/User';
import UserContext from './UserContext';

const UserProvider = ({ children }) => {
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

  return (
    <UserContext.Provider value={user}>
      { children }
    </UserContext.Provider>
  );
}

export default UserProvider;
