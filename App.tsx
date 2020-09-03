import React from 'react';
import 'react-native-gesture-handler';
import { Container, Root } from 'native-base';

import Navigation from './src/components/Navigation';
import FooterMenu from './src/components/FooterMenu';
import Notification from './src/components/Notification';
import UserProvider from './src/contexts/UserContext/UserProvider';

declare const global: { HermesInternal: null | {} };

console.disableYellowBox = true;

const App = () => {
  return (
    <Root>
      <UserProvider>
        <Notification>
          <Container>
            <Navigation />
            <FooterMenu />
          </Container>
        </Notification>
      </UserProvider>
    </Root>
  );
};

export default App;
