import { createContext } from 'react';
import { UserState } from '../../interfaces/User';

const initialState: UserState = {
  isSignIn: false,
  user: {},
  setUser: (_user: any, _isSignIn: boolean) => {},
};

const UserContext = createContext(initialState);

export default UserContext;
