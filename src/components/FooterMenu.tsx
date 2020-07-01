import React, { useContext } from 'react';
import { Footer, FooterTab, Button, Text } from 'native-base';

import { navigate } from '../services/NavigationService';
import UserContext from '../contexts/UserContext/UserContext';

const FooterMenu = () => {
  const { user, isSignIn } = useContext(UserContext);

  return (
    <Footer>
      <FooterTab>
        <Button vertical onPress={() => navigate('Places')}>
          <Text>Lugares</Text>
        </Button>

        <Button
          vertical
          onPress={() => navigate(isSignIn ? 'Queues' : 'SignIn')}>
          <Text>{user.isPlace ? 'Fila' : 'Filas'}</Text>
        </Button>

        <Button
          vertical
          onPress={() => navigate(isSignIn ? 'Profile' : 'SignUp')}>
          <Text>Perfil</Text>
        </Button>
      </FooterTab>
    </Footer>
  );
};

export default FooterMenu;
