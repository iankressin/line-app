import React from 'react';
import styled from 'styled-components';
import { Title, Section, Flex, Container, RoundedCard } from '../components/Layout';
import { Text, View } from 'native-base';

const ServiceTitle = styled(Title)`
  font-size: 20px;
  font-weight: bold;
`;

const Service = ({ route }) => {
  const service = route.params.service;

  return (
    <Container>
      <RoundedCard>
        <Section>
          <ServiceTitle>{service.title}</ServiceTitle>
          <Text note style={{marginBottom: 15}}>{`${service.user.firstName} ${service.user.lastName}`}</Text>
        </Section>
        <Section>
          <Text style={{marginBottom: 15}}>{service.description}</Text>
        </Section>
        <View style={{ marginBottom: 10 }}>
          <Text style={{ fontWeight: 'bold' }}>Telefone:</Text>
          <Text> {service.user.phone}</Text>
        </View>
        <View>
          <Text style={{ fontWeight: 'bold' }}>E-mail:</Text>
          <Text>{service.user.email}</Text>
        </View>
      </RoundedCard>
    </Container>
  );
};

export default Service;
