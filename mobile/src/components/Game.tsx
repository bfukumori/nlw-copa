import { Button, HStack, Text, useTheme, VStack } from 'native-base';
import { X, Check } from 'phosphor-react-native';
import { getName } from 'country-list';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';

import { Team } from './Team';

interface GuessProps {
  id: string;
  gameId: string;
  createdAt: string;
  participantId: string;
  firstTeamPoints: number;
  secondTeamPoints: number;
}

export interface GameProps {
  id: string;
  firstTeamCountryCode: string;
  date: string;
  secondTeamCountryCode: string;
  guess: null | GuessProps;
}

interface Props {
  data: GameProps;
  onGuessConfirm: () => void;
  setFirstTeamPoints: (value: string) => void;
  setSecondTeamPoints: (value: string) => void;
}

export function Game({
  data,
  setFirstTeamPoints,
  setSecondTeamPoints,
  onGuessConfirm,
}: Props) {
  const { colors, sizes } = useTheme();
  const when = dayjs(data.date)
    .locale('pt-br')
    .format(`DD [de] MMMM [de] YYYY [às] HH:mm[h]`);
  const gameDateHasPassed = new Date(data.date) < new Date();

  return (
    <VStack
      w='full'
      bgColor='gray.800'
      rounded='sm'
      alignItems='center'
      borderBottomWidth={3}
      borderBottomColor='yellow.500'
      mb={3}
      p={4}
    >
      <Text color='gray.100' fontFamily='heading' fontSize='sm'>
        {getName(data.firstTeamCountryCode)} vs.{' '}
        {getName(data.secondTeamCountryCode)}
      </Text>

      <Text color='gray.200' fontSize='xs'>
        {when}
      </Text>

      <HStack
        mt={4}
        w='full'
        justifyContent='space-between'
        alignItems='center'
      >
        <Team
          code={data.firstTeamCountryCode}
          position='right'
          onChangeText={setFirstTeamPoints}
          guessValue={
            data.guess ? String(data.guess.firstTeamPoints) : undefined
          }
          gameDateHasPassed={gameDateHasPassed}
        />

        <X color={colors.gray[300]} size={sizes[6]} />

        <Team
          code={data.secondTeamCountryCode}
          position='left'
          onChangeText={setSecondTeamPoints}
          guessValue={
            data.guess ? String(data.guess.secondTeamPoints) : undefined
          }
          gameDateHasPassed={gameDateHasPassed}
        />
      </HStack>

      {!data.guess &&
        (gameDateHasPassed ? (
          <Button
            size='xs'
            w='full'
            bgColor='gray.600'
            mt={4}
            onPress={onGuessConfirm}
            disabled
          >
            <HStack alignItems='center'>
              <Text color='gray.300' fontSize='xs' fontFamily='heading' mr={3}>
                TEMPO ESGOTADO
              </Text>
            </HStack>
          </Button>
        ) : (
          <Button
            size='xs'
            w='full'
            bgColor='green.500'
            mt={4}
            onPress={onGuessConfirm}
          >
            <HStack alignItems='center'>
              <Text color='white' fontSize='xs' fontFamily='heading' mr={3}>
                CONFIRMAR PALPITE
              </Text>

              <Check color={colors.white} size={sizes[4]} />
            </HStack>
          </Button>
        ))}
    </VStack>
  );
}
