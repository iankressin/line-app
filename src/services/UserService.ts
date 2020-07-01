import axios from 'axios';

import { User } from '../interfaces/User';

class UserService {
  private URL = 'http://192.168.0.33:8080/user';

  create = async (user: User): Promise<User> => {
    const newUser = await axios.post(this.URL, user);

    return <User>newUser.data;
  };
}

export default new UserService();
