import React from 'react';
import { TouchableHighlight } from 'react-native';
import { Card, CardItem, Text, Body } from 'native-base';

import { Place } from '../interfaces/Place';
import { navigate } from '../services/NavigationService';

const PlaceCard = ({ place }: { place: Place }) => {
  return (
    <TouchableHighlight onPress={() => navigate('Place', { place })}>
      <Card>
        <CardItem header>
          <Text>{place.name}</Text>
        </CardItem>
        <CardItem>
          <Body>
            <Text>Na fila: {place.queue.length}</Text>
          </Body>
        </CardItem>
        <CardItem footer>
          <Text></Text>
        </CardItem>
      </Card>
    </TouchableHighlight>
  );
};

export default PlaceCard;
