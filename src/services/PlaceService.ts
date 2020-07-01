import axios from 'axios';

class PlaceService {
  private BASE_URL = 'http://192.168.0.33:8080';

  list = async (): Promise<any> => {
    const places = await axios.get(`${this.BASE_URL}/place`);

    return places.data;
  };

  get = async (props: any): Promise<any> => {
    console.log('Fetching data......');
    const place = await axios.get(`${this.BASE_URL}/place/${props.placeId}`);
    console.log(place.data);

    return place.data;
  };
}

export default new PlaceService();
