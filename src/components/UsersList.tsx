import React, { Component } from 'react';
import {
  Container,
  Header,
  Content,
  List,
  ListItem,
  Left,
  Body,
  Right,
  Thumbnail,
  Text,
} from 'native-base';

import { User } from '../interfaces/User';

const Item = ({ user, index }: { user: User; index: number}) => {
  return (
    <ListItem avatar>
      <Left>
        {/*
          <Thumbnail source={{ uri: 'Image URL' }} />
        */}
      </Left>
      <Body>
        <Text>
          {user.firstName} {user.lastName}
        </Text>
        {/* <Text note>Doing what you like will always keep you happy . .</Text> */}
      </Body>
      <Right>
        <Text note>{index}</Text>
      </Right>
    </ListItem>
  );
};

const UsersList = ({ users }: { users: User[] }) => {
  return (
    <List>
      {!users ? (
        <Text>'Carregando...'</Text>
      ) : (
        users.map((user, index) => <Item user={user} index={index} />)
      )}
    </List>
  );
};

export default UsersList;
