import axios from 'axios';

import { User } from '../interfaces/User';
import { Place } from '../interfaces/Place';

class QueueService {
  public URL = 'http://192.168.0.33:8080/queue';

  enqueue = async (placeId: string): Promise<Place> => {
    const place = await axios.post(`${this.URL}`, { placeId });

    return place.data;
  };

  dequeue = async (): Promise<User> => {
    const user = await axios.get(this.URL);

    return user.data;
  };
}

export default new QueueService();
