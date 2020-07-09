import React, { useState, useContext } from 'react';
import styled from 'styled-components/native';
import { View } from 'react-native';
import { Button, Card, Text, Thumbnail } from 'native-base';

import NotificationService from '../services/NotificationService';
import UserContext from '../contexts/UserContext/UserContext';
import { Place } from '../interfaces/Place';
import QueueService from '../services/QueueService';

const RoundedCard = styled(Card)`
  border-radius: 5px;
  padding: 15px;
`;

const InfoContainer = styled(View)`
  flex-wrap: wrap;
  flex-direction: row;
  margin-bottom: 10px;
  border-bottom-color: #f0f0f0;
  border-bottom-width: 1px;
`;

const RoundedThumbnail = styled(Thumbnail)`
  border-radius: 5px;
  margin-right: 10px;
  margin-bottom: 20px;
`;

const Container = styled(View)`
  padding: 5px 10px;
`;

const Title = styled(Text)`
  font-size: 17px;
  margin-bottom: 5px;
`

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
`

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

        <Button full onPress={() => enqueue()}>
          <Text>Entrar na fila</Text>
        </Button>
      </RoundedCard>
    </Container>
  );
};



export default PlaceDetail;
