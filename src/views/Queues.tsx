import React, { useContext, useEffect, useState } from 'react';
import { View } from 'react-native';
import { useAsync } from 'react-async';
import { Button, Text } from 'native-base';

import { User } from '../interfaces/User';
import UsersList from '../components/UsersList';
import UserContext from '../contexts/UserContext/UserContext';
import PlaceService from '../services/PlaceService';
import QueueService from '../services/QueueService';

const PlaceQueue = ({ placeId }: { placeId: string | undefined }) => {
  const { data, isPending } = useAsync({
    promiseFn: PlaceService.get,
    placeId,
  });
  const [queue, setQueue] = useState([]);

  useEffect(() => {
    if (isPending) return;

    setQueue(data.queue);
  }, [data, isPending]);

  const handleDequeue = async () => {
    await dequeue();

    const newQueue = queue;
    newQueue.shift();

    setQueue(queue.slice(1));
  };

  const dequeue = async () => {
    const next: User = await QueueService.dequeue();

    console.log(next);
  };

  if (isPending) {
    return <Text>Carregando...</Text>;
  }

  return (
    <View>
      <UsersList users={queue} />
      <Button full onPress={handleDequeue}>
        <Text>Próximo</Text>
      </Button>
    </View>
  );
};

const UserQueue = () => <Text>UserQueue</Text>;

const Queues = () => {
  const { user } = useContext(UserContext);

  return (
    <View>
      {user.isPlace ? <PlaceQueue placeId={user.placeId} /> : <UserQueue />}
    </View>
  );
};

export default Queues;
