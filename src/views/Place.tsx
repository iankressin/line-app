import React, { useState, useContext } from 'react';
import styled from 'styled-components/native';
import { View } from 'react-native';
import { Button, Text, Toast } from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';

import NotificationService from '../services/NotificationService';
import UserContext from '../contexts/UserContext/UserContext';
import { Place } from '../interfaces/Place';
import QueueService from '../services/QueueService';
import {
  FlexCenter,
  Title,
  Container,
  RoundedCard,
  InfoContainer,
  RoundedThumbnail,
} from '../components/Layout';

const QueueInfo = styled(View)`
  border: 6px solid #cacdde;
  border-radius: 100px;
  width: 200px;
  height: 200px;
  text-align: center;
  margin: 10px auto;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PlaceDetail = ({ route, navigation }) => {
  const [place, setPlace] = useState(route.params.place);
  const { user, setUser } = useContext(UserContext);

  const enqueue = async () => {
    try {
      const updatedPlace: Place = await QueueService.enqueue(place._id);

      const notification = new NotificationService(user);

      notification.registerActions();

      Toast.show({
        text: 'Você está na fila, espere ser chamado!',
        buttonText: 'Ok',
        type: 'success',
      });

      setPlace(updatedPlace);
    } catch (error) {
      if (error.response.status === 401) {
        setUser({}, false);

        await AsyncStorage.removeItem('@lines_user');

        navigation.navigate('SignIn');
      } else {
        Toast.show({
          text: error.response.data.message,
          buttonText: 'Ok',
          type: 'warning',
        });
      }
    }
  };

  const sendReview = () => {
    navigation.navigate('Review', { place });
  }

  return (
    <Container>
      <RoundedCard>
        <InfoContainer>
          <RoundedThumbnail square large source={{ uri: place.imagePath }} />
          <View>
            <Title>{place.name}</Title>
            <Text note>
              {place.city} - {place.stateOrProvince}
            </Text>
            <Text note>{place.address}</Text>
          </View>
        </InfoContainer>

        <QueueInfo>
          <Text style={{ textAlign: 'center', fontSize: 30 }}>
            {place.queue.length}
          </Text>
          <Text style={{ textAlign: 'center' }}>pessoas na fila</Text>
        </QueueInfo>

        <View>
          <Button full onPress={() => enqueue()}>
            <Text>Entrar na fila</Text>
          </Button>
        </View>

        <FlexCenter style={{ marginTop: 20 }}>
          <Text>Como está sendo sua experiência na fila?</Text>
          <Button transparent onPress={() => sendReview()}>
            <Text>Avalie!</Text>
          </Button>
        </FlexCenter>
      </RoundedCard>
    </Container>
  );
};

export default PlaceDetail;
