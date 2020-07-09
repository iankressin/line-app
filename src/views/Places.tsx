import React, { useState, useEffect } from 'react';
import {
  Content,
  List,
  ListItem,
  Thumbnail,
  Text,
  Left,
  Body,
  Right,
  Button,
} from 'native-base';
import { StyleSheet } from 'react-native';

import { Place } from '../interfaces/Place';
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
    <Content>
      <List style={styles.list}>
        {!places ? (
          <Text>Carregando...</Text>
        ) : (
          places.map((place: Place, index: number) => (
            <ListItem
              key={index}
              thumbnail
              onPress={() => navigation.navigate('Place', { place })}>
              <Left>
                <Thumbnail
                  square
                  source={{ uri: place.imagePath }}
                  style={styles.thumbnail}
                />
              </Left>
              <Body>
                <Text>{place.name}</Text>
                <Text note numberOfLines={1}>
                  {place.address}
                </Text>
              </Body>
              <Right>
                <Button transparent>
                  <Text>Ver</Text>
                </Button>
              </Right>
            </ListItem>
          ))
        )}
      </List>
    </Content>
  );
};

const styles = StyleSheet.create({
  thumbnail: {
    borderRadius: 5,
  },
  list: {
    backgroundColor: '#ffffffff',
  },
});

export default Places;
