import axios from 'axios';

import { User } from '../interfaces/User';

class AuthService {
  private BASE_URL = 'http://192.168.0.33:8080/auth';

  signIn = async (email: string, password: string): Promise<User> => {
    const user = await axios.post(`${this.BASE_URL}/signin`, {
      email,
      password,
    });

    return user.data;
  };
}

export default new AuthService();
