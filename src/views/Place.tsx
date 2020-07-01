import React, { useState } from 'react';
import { View } from 'react-native';
import { Button, Text } from 'native-base';

import { Place } from '../interfaces/Place';
import QueueService from '../services/QueueService';

const PlaceDetail = ({ route }) => {
  const [place, setPlace] = useState(route.params.place);

  const enqueue = async () => {
    try {
      const updatedPlace: Place = await QueueService.enqueue(place._id);

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
