import { StyleSheet } from 'react-native';
import { Button } from "@rneui/themed";

import * as usersService from '../../services/users';
import { Text, View } from '../../components/Themed';
import { BottomTabProps } from '../../navigation/types';

export default function ProfileScreen(props: BottomTabProps<'Profile'>) {
  const signOut = () => {
    usersService.signOut();
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
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
