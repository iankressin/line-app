import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';

import { Place } from '../interfaces/Place';
import PlaceCard from '../components/PlaceCard';
import PlaceService from '../services/PlaceService';

const Places = ({ navigation }) => {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      const placesList = await PlaceService.list();

      setPlaces(placesList);
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <View>
      {!places ? (
        <Text>Carregando...</Text>
      ) : (
        places.map((place: Place) => <PlaceCard place={place} />)
      )}
    </View>
  );
};

export default Places;
