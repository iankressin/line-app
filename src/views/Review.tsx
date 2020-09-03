import React, { useState } from 'react';
import { Form, Item, Picker, Textarea, Toast } from 'native-base';
import { Button, Text, View } from 'native-base';

import ReviewService from '../services/ReviewService';
import {
  Title,
  Container,
  RoundedCard,
  InfoContainer,
  RoundedThumbnail,
} from '../components/Layout';

const Review = ({ navigation, route }) => {
  const place = route.params.place;
  const [review, setReview] = useState({ score: null, description: '' });
  const REVIEW_RANGE = 10;

  const reviewOptions = () => {
    const options = [];

    for (let i = 0; i <= REVIEW_RANGE; i++) {
      options.push(<Picker.Item label={`${i}`} value={i} />);
    }

    return options;
  };

  const sendReview = async () => {
    try {
      await ReviewService.create({ score: review.score, placeId: place._id });

      Toast.show({
        text: 'Sua avaliação é muito importate. Obrigado!',
        buttonText: 'Ok',
        duration: 2000,
        type: 'success',
      });

      resetForm();
    } catch (error) {
      console.log(error);
      Toast.show({
        text: error.response.data.message,
        buttonText: 'Ok',
        type: 'danger',
      });
    }
  };

  const resetForm = () => setReview({ score: null, description: '' });

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
        <Form>
          <Text>Como você avalia sua experiência nesta fila?</Text>
          <Item picker>
            <Picker
              mode="dropdown"
              note
              style={{ marginTop: 10 }}
              placeholderStyle={{ color: '#bfc6ea' }}
              placeholderIconColor="#007aff"
              selectedValue={review.score}
              onValueChange={(score) => setReview({ ...review, score })}>
              <Picker.Item label="Dê sua nota" value={null}/>
              {reviewOptions()}
            </Picker>
          </Item>

          <View style={{ marginTop: 30 }}>
            <Text style={{ marginBottom: 10 }}>Quer contar mais sobre?</Text>
            <Textarea
              value={review.description}
              onChange={((description: string) => setReview({ ...review, description}))}
              style={{ borderRadius: 5, marginBottom: 20 }}
              rowSpan={4}
              bordered
              placeholder="Como foi sua experiência?"
            />
          </View>

          <Button full onPress={() => sendReview()}>
            <Text>Enviar review</Text>
          </Button>
        </Form>
      </RoundedCard>
    </Container>
  );
};

export default Review;
