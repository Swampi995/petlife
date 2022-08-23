import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Button, Input, Icon } from "@rneui/themed";

import * as usersService from '../../services/users';
import { Text, View } from '../../components/Themed';
import { AuthStackScreenProps } from '../../navigation/types';
import Colors from '../../constants/Colors';

export default function LoginScreen({ navigation }: AuthStackScreenProps<'Login'>) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const singIn = () => {
    usersService.signIn(email, password, signInCallback);
  }

  const signInCallback = (type: 'success' | 'error') => {

  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome</Text>
      <Button onPress={() => navigation.navigate('Register')} title={'Go to register'} />
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <Input
        value={email}
        placeholder="Email"
        leftIcon={<Icon tvParallaxProperties color={Colors.grey} style={styles.icon} type='font-awesome' name='envelope' size={20} />}
        onChangeText={setEmail}
      />
      <Input
        value={password}
        secureTextEntry
        placeholder="Password"
        leftIcon={<Icon tvParallaxProperties color={Colors.grey} style={styles.icon} type='font-awesome' name='lock' size={26} />}
        onChangeText={setPassword}
      />
      <Button onPress={singIn} title={'Sign in'} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  icon: {
    marginRight: 8,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
