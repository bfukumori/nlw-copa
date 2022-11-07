import { useState, useEffect } from 'react';
import { Share } from 'react-native';
import { HStack, useToast, VStack } from 'native-base';
import { useRoute } from '@react-navigation/native';

import { api } from '../services/api';
import { Header } from '../components/Header';
import { PoolCardProps } from '../components/PoolCard';
import { Loading } from '../components/Loading';
import { EmptyMyPoolList } from '../components/EmptyMyPoolList';
import { PoolHeader } from '../components/PoolHeader';
import { Option } from '../components/Option';
import { Guesses } from '../components/Guesses';

interface RouteParams {
  id: string;
}

export function Details() {
  const [poolDetails, setPoolDetails] = useState<PoolCardProps>(
    {} as PoolCardProps
  );
  const [loading, setLoading] = useState(true);
  const [options, setOption] = useState<'guess' | 'ranking'>('guess');

  const route = useRoute();
  const { id } = route.params as RouteParams;
  const toast = useToast();

  async function fetchPoolDetails() {
    try {
      const response = await api.get(`/pools/${id}`);
      setPoolDetails(response.data.pool);
    } catch (error) {
      console.log(error);
      toast.show({
        title: 'Não foi possível carregar os detalhes do bolão!',
        placement: 'top',
        bgColor: 'red.500',
      });
    } finally {
      setLoading(false);
    }
  }

  async function handleCodeShare() {
    await Share.share({
      message: poolDetails.code,
    });
  }

  useEffect(() => {
    fetchPoolDetails();
  }, [id]);

  if (loading) {
    return <Loading />;
  }

  return (
    <VStack flex={1} bgColor='gray.900'>
      <Header
        title={poolDetails.title}
        showBackButton
        showShareButton
        onShare={handleCodeShare}
      />
      {poolDetails._count.participants > 0 ? (
        <VStack flex={1} px={5}>
          <PoolHeader data={poolDetails} />
          <HStack bgColor='gray.800' p={1} rounded='sm' mb={5}>
            <Option
              title='Seus palpites'
              isSelected={options === 'guess'}
              onPress={() => setOption('guess')}
            />
            <Option
              title='Ranking do grupo'
              isSelected={options === 'ranking'}
              onPress={() => setOption('ranking')}
            />
          </HStack>
          <Guesses
            poolId={poolDetails.id}
            code={poolDetails.code}
            onShare={handleCodeShare}
          />
        </VStack>
      ) : (
        <EmptyMyPoolList code={poolDetails.code} onShare={handleCodeShare} />
      )}
    </VStack>
  );
}
