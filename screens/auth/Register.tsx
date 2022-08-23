import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Button, Input, Icon } from "@rneui/themed";

import * as usersService from '../../services/users';
import { View } from '../../components';
import Colors from '../../constants/Colors';
import { AuthStackScreenProps } from '../../navigation/types';

export default function RegisterScreen({ navigation }: AuthStackScreenProps<'Register'>) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submitRegister = () => {
    usersService.registerAccount(name, email, password, registerCallback);
  }

  const registerCallback = (type: 'success' | 'error') => {

  }

  const navigateToLogin = () => {

  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
      </View>
      <View style={styles.form}>
        <Input
          value={name}
          placeholder="Name"
          leftIcon={<Icon tvParallaxProperties color={Colors.grey} style={styles.icon} type='font-awesome' name='user' size={26} />}
          onChangeText={setName}
        />
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
      </View>
      <View style={styles.actions}>
        <Button onPress={submitRegister} title={'Register'} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  icon: {
    marginRight: 8,
  },
  form: {
    padding: 24,
  },
  actions: {
    padding: 24,
  },
});
