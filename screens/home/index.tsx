import { StyleSheet } from 'react-native';
import { Button } from "react-native-elements";

import { Text, View } from '../../components/Themed';
import * as usersService from '../../services/users';
import { RootTabScreenProps } from '../../navigation/types';

export default function HomeScreen({ navigation }: RootTabScreenProps<'Home'>) {

  const signOut = () => {
    usersService.signOut();
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab One</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <Button onPress={signOut} title={'Sign out'} />
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
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
