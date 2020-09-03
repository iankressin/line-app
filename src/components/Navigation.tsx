import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Place from '../views/Place';
import Places from '../views/Places';
import Queues from '../views/Queues';
import SignIn from '../views/SignIn';
import SignUp from '../views/SignUp';
import Review from '../views/Review';
import Profile from '../views/Profile';
import Service from '../views/Service';
import Services from '../views/Services';

import UserContext from '../contexts/UserContext/UserContext';
import { navigationRef } from '../services/NavigationService';

const Stack = createStackNavigator();

const Navigation = () => {
  const { isSignIn } = useContext(UserContext);

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator>
        <Stack.Screen name="Places" component={Places} />

        <Stack.Screen name="Place" component={Place} />

        {isSignIn ? (
          <>
            <Stack.Screen name="Profile" component={Profile} />

            <Stack.Screen name="Queues" component={Queues} />

            <Stack.Screen name="Review" component={Review} />

            <Stack.Screen name="Services" component={Services} />

            <Stack.Screen name="Service" component={Service} />
          </>
        ) : (
          <>
            <Stack.Screen name="SignIn" component={SignIn} />

            <Stack.Screen name="SignUp" component={SignUp} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
