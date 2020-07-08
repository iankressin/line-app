import React from 'react';
import 'react-native-gesture-handler';
import { Container } from 'native-base';

import Navigation from './src/components/Navigation';
import FooterMenu from './src/components/FooterMenu';
import Notification from './src/components/Notification';
import UserProvider from './src/contexts/UserContext/UserProvider';

declare const global: { HermesInternal: null | {} };

const App = () => {
  return (
    <UserProvider>
      <Notification>
        <Container>
          <Navigation />
          <FooterMenu />
        </Container>
      </Notification>
    </UserProvider>
  );
};

export default App;
