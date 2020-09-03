import axios from 'axios';

import { User } from '../interfaces/User';

class UserService {
  private URL = 'http://192.168.0.33:8080/user';

  create = async (user: User): Promise<User> => {
    const newUser = await axios.post(this.URL, user);

    return <User>newUser.data;
  };

  listOffers = async (): Promise<any[]> => {
    const response = await axios.get(this.URL);
    const users = response.data;
    const offers = [];

    users.forEach(user => {
      if (user.offer.category) {
        offers.push({ ...user.offer, user: user });
      }
    });

    return offers;
  };

  listDemands = async (): Promise<any[]> => {
    const response = await axios.get(this.URL);
    const users = response.data;
    const demands = [];

    users.forEach(user => {
      if (user.demand.category) {
        demands.push({ ...user.demand, user: user });
      }
    });

    console.log(demands);

    return demands;
  };
}

export default new UserService();
