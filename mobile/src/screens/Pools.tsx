import { useState, useCallback } from 'react';
import { FlatList, Icon, useToast, VStack } from 'native-base';
import { Octicons } from '@expo/vector-icons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

import { Button } from '../components/Button';
import { Header } from '../components/Header';
import { EmptyPoolList } from '../components/EmptyPoolList';
import { PoolCard, PoolCardProps } from '../components/PoolCard';
import { Loading } from '../components/Loading';
import { api } from '../services/api';

export function Pools() {
  const [pools, setPools] = useState<PoolCardProps[]>([]);
  const [loading, setLoading] = useState(false);

  const { navigate } = useNavigation();
  const toast = useToast();

  async function fetchPools() {
    try {
      setLoading(true);
      const response = await api.get('/pools');
      setPools(response.data.pools);
    } catch (error) {
      console.log(error);
      toast.show({
        title: 'Não foi possível carregar os bolões!',
        placement: 'top',
        bgColor: 'red.500',
      });
    } finally {
      setLoading(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchPools();
    }, [])
  );

  return (
    <VStack flex={1} bgColor='gray.900'>
      <Header title='Meus bolões' />
      <VStack
        mt={6}
        mx={5}
        borderBottomWidth={1}
        borderBottomColor='gray.600'
        pb={4}
        mb={4}
      >
        <Button
          title='Buscar bolão por código'
          leftIcon={
            <Icon as={Octicons} name='search' color='black' size='md' />
          }
          onPress={() => navigate('find')}
        />
      </VStack>
      {loading ? (
        <Loading />
      ) : (
        <FlatList
          px={5}
          _contentContainerStyle={{ pb: 10 }}
          showsVerticalScrollIndicator={false}
          data={pools}
          ListEmptyComponent={() => <EmptyPoolList />}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <PoolCard
              data={item}
              onPress={() => navigate('details', { id: item.id })}
            />
          )}
        />
      )}
    </VStack>
  );
}
