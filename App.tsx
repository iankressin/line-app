import React from 'react';
import 'react-native-gesture-handler';
import { Container } from 'native-base';

import UserProvider from './src/contexts/UserContext/UserProvider';
import Navigation from './src/components/Navigation';
import FooterMenu from './src/components/FooterMenu';

declare const global: { HermesInternal: null | {} };

const App = () => {
  return (
    <UserProvider>
      <Container>
        <Navigation />
        <FooterMenu />
      </Container>
    </UserProvider>
  );
};

export default App;
