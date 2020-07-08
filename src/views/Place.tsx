import React, { useState, useContext } from 'react';
import { View } from 'react-native';
import { Button, Text } from 'native-base';

import NotificationService from '../services/NotificationService';
import UserContext from '../contexts/UserContext/UserContext';
import { Place } from '../interfaces/Place';
import QueueService from '../services/QueueService';

const PlaceDetail = ({ route }) => {
  const [place, setPlace] = useState(route.params.place);
  const { user } = useContext(UserContext);

  const enqueue = async () => {
    try {
      const updatedPlace: Place = await QueueService.enqueue(place._id);

      const notification = new NotificationService(user);

      notification.registerActions();

      setPlace(updatedPlace);
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
