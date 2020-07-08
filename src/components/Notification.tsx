import React, { useEffect, useContext } from 'react';
import { View } from 'react-native';

import UserContext from '../contexts/UserContext/UserContext';
import NotificationService from '../services/NotificationService';

const Notification = ({ children }: { children: React.ReactNode }) => {
  const { user } = useContext(UserContext);

  useEffect(() => {
    const notification = new NotificationService(user);
    notification.registerActions();
    console.log('Notification has been registered');
  }, [user]);

  return <>{children}</>;
};

export default Notification;
