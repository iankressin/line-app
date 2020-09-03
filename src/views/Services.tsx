import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {
  Badge,
  Content,
  List,
  ListItem,
  Text,
  Left,
  Body,
  Right,
  Button,
} from 'native-base';
import { FlexCenter, Flex } from '../components/Layout';
import { StyleSheet } from 'react-native';

import UserService from '../services/UserService';

const Tag = styled(Badge)`
  background-color: #b3b3b3;
  margin-right: 10px;
  margin-top: 10px;
`;

const SwitchButton = ({ onChange }) => {
  const [selected, setSelected] = useState('offer');

  useEffect(() => {
    console.log('Selected: ', selected);
    onChange(selected)
  }, [selected, onChange]);

  return (
    <FlexCenter style={{ marginTop: 10, marginBottom: 10 }}>
      <Flex>
        <Button
          bordered
          style={{ width: 100 }}
          light={selected !== 'offer'}
          onPress={() => setSelected('offer')}>
          <Text>Ofertas</Text>
        </Button>
        <Button
          bordered
          style={{ width: 110 }}
          light={selected !== 'demand'}
          onPress={() => setSelected('demand')}>
          <Text>Demandas</Text>
        </Button>
      </Flex>
    </FlexCenter>
  );
};

const Services = ({ navigation }) => {
  const [services, setServices] = useState([]);
  const [filter, setFilter] = useState('offer');

  useEffect(() => {
    try {
      filter === 'offer' ? getOffers() : getDemands();
    } catch (error) {
      console.log('Error: ', error);
    }
  }, [filter]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      const serviceList = await UserService.listOffers();

      setServices(serviceList);
    });

    return unsubscribe;
  }, [navigation]);

  const getOffers = async () => {
    const serviceList = await UserService.listOffers();

    setServices(serviceList);
  }

  const getDemands = async () => {
    const serviceList = await UserService.listDemands();

    console.log('Service list: ', serviceList);

    setServices(serviceList);
  }

  return (
    <Content>
      <SwitchButton onChange={setFilter} />
      <List style={styles.list}>
        {!services ? (
          <Text>Carregando...</Text>
        ) : (
          services.map((service: any, index: number) => (
            <ListItem
              key={index}
              thumbnail
              onPress={() => navigation.navigate('Service', { service })}>
              <Left>
                <Text>{}</Text>
              </Left>
              <Body>
                <Text>{service.title}</Text>
                <Text note numberOfLines={1}>
                  {`${service.user.firstName} ${service.user.lastName}`}
                </Text>
                <Flex style={{ flexDirection: 'row' }}>
                  {service.tags.map((tag) => {
                    return (
                      <Tag>
                        <Text>#{tag}</Text>
                      </Tag>
                    );
                  })}
                </Flex>
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

export default Services;
