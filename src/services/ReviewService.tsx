import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

class ReviewService {
  public URL = 'http://192.168.0.33:8080/review';

  create = async ({
    placeId,
    score,
  }: {
    placeId: string;
    score: number | null;
  }) => {
    const jsonUser = await AsyncStorage.getItem('@lines_user');
    const user = JSON.parse(`${jsonUser}`);

    return axios.post(
      this.URL,
      { placeId, score },
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      },
    );
  };
}

export default new ReviewService();
