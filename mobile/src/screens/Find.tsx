import { useState } from 'react';
import { Heading, useToast, VStack } from 'native-base';
import { AxiosError } from 'axios';

import { Header } from '../components/Header';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { api } from '../services/api';
import { useNavigation } from '@react-navigation/native';

export function Find() {
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);

  const toast = useToast();
  const { navigate } = useNavigation();

  async function handleJoinPool() {
    if (!code.trim()) {
      return toast.show({
        title: 'Informe o código do bolão!',
        placement: 'top',
        bgColor: 'red.500',
      });
    }
    try {
      setLoading(true);
      await api.post('/pools/join', { code });
      return toast.show({
        title: 'Você entrou no bolão com sucesso!',
        placement: 'top',
        bgColor: 'green.500',
      });
      navigate('pools');
    } catch (error) {
      console.log(error);
      setLoading(false);
      if (
        error instanceof AxiosError &&
        error.response?.data.message === 'Pool not found!'
      ) {
        return toast.show({
          title:
            'Não foi possível encontrar o bolão! Verifique o código novamente.',
          placement: 'top',
          bgColor: 'red.500',
        });
      }
      if (
        error instanceof AxiosError &&
        error.response?.data.message === "You've already joined this pool!"
      ) {
        return toast.show({
          title: 'Você já está cadastrado nesse bolão!',
          placement: 'top',
          bgColor: 'red.500',
        });
      }
    }
  }

  return (
    <VStack flex={1} bgColor='gray.900'>
      <Header title='Busca por código' showBackButton />
      <VStack mt={8} mx={5} alignItems='center'>
        <Heading
          fontFamily='heading'
          color='white'
          fontSize='xl'
          mb={8}
          textAlign='center'
        >
          Encontre um bolão através de seu código único
        </Heading>
        <Input
          mb={2}
          placeholder='Qual o código do bolão?'
          value={code}
          onChangeText={setCode}
          autoCapitalize='characters'
        />
        <Button
          title='Buscar bolão'
          isLoading={loading}
          onPress={handleJoinPool}
        />
      </VStack>
    </VStack>
  );
}
