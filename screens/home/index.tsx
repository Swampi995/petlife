import { StyleSheet } from 'react-native';
import { Button } from "@rneui/themed";
import { FlashList } from "@shopify/flash-list";

import { Text, View } from '../../components/Themed';
import { RootTabScreenProps } from '../../navigation/types';

export default function HomeScreen({ navigation }: RootTabScreenProps<'Home'>) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>

      </View>
      <View style={styles.flashListContainer}>
        {/* <FlashList
          renderItem={({ item }) => {
            return <TweetCell item={item} />;
          }}
          getItemType={({ item }) => {
            return item.type;
          }}
          data={tweets}
        /> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {

  },
  flashListContainer: {

  }
});
