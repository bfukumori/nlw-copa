import { HStack } from 'native-base';
import CountryFlag from 'react-native-country-flag';

import { Input } from './Input';

interface Props {
  code: string;
  position: 'left' | 'right';
  onChangeText: (value: string) => void;
  guessValue?: string;
  gameDateHasPassed: boolean;
}

export function Team({
  code,
  position,
  onChangeText,
  guessValue,
  gameDateHasPassed,
}: Props) {
  return (
    <HStack alignItems='center'>
      {position === 'left' && (
        <CountryFlag isoCode={code} size={25} style={{ marginRight: 12 }} />
      )}

      <Input
        w={12}
        h={9}
        textAlign='center'
        fontSize='xs'
        keyboardType='numeric'
        onChangeText={onChangeText}
        value={guessValue}
        isDisabled={guessValue !== undefined || gameDateHasPassed}
      />

      {position === 'right' && (
        <CountryFlag isoCode={code} size={25} style={{ marginLeft: 12 }} />
      )}
    </HStack>
  );
}
