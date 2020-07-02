import React, { useState, useContext } from 'react';
import io from 'socket.io-client';
import { Alert, View } from 'react-native';
import { Button, Text } from 'native-base';

import UserContext from '../contexts/UserContext/UserContext';
import { User } from '../interfaces/User';
import { Place } from '../interfaces/Place';
import QueueService from '../services/QueueService';

const PlaceDetail = ({ route }) => {
  const [place, setPlace] = useState(route.params.place);
  const user = useContext(UserContext);

  const enqueue = async () => {
    try {
      const updatedPlace: Place = await QueueService.enqueue(place._id);

      const socket = io.connect('http://192.168.0.33:8080');
      socket.on('next', (next: User) => {
        if (next.email === user.user.email) {
          Alert.alert(
            'Próximo',
            'Chegou a sua vez de ser atendido!',
            [
              {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
              },
              { text: 'OK', onPress: () => console.log('OK Pressed') },
            ],
            { cancelable: false },
          );
        }
      });

      setPlace(updatedPlace);

      console.log(updatedPlace);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View>
      <Text>{place.name}</Text>
      <Text>{place.queue.length}</Text>

      <Button full onPress={() => enqueue()}>
        <Text>Entrar na fila</Text>
      </Button>
    </View>
  );
};

export default PlaceDetail;
