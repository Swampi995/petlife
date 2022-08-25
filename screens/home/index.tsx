import { StyleSheet, Dimensions } from 'react-native';
import { query, startAfter } from 'firebase/firestore';
import { FlashList } from "@shopify/flash-list";
import { useFirestoreInfiniteQuery } from "@react-query-firebase/firestore";
import { Text, View } from '../../components/Themed';
import { postsQuery } from '../../services/posts';
import { RootTabScreenProps } from '../../navigation/types';

export default function HomeScreen({ navigation }: RootTabScreenProps<'Home'>) {
  const { width } = Dimensions.get('screen');

  const posts = useFirestoreInfiniteQuery('posts', postsQuery, (snapshot) => {
    const lastDocument = snapshot.docs[snapshot.docs.length - 1];
    return query(postsQuery, startAfter(lastDocument));
  });

  const data = posts.data?.pages.map((page) => page.docs.map((item) => item.data()).flat()).flat();

  return (
    <View style={styles.container}>
      <View style={styles.header}>

      </View>
      <View style={[{ width }, styles.flashListContainer]}>
        <FlashList
          estimatedItemSize={50}
          onEndReached={posts.fetchNextPage}
          renderItem={({ item }) => {
            return <View >
              <Text>{item?.message}</Text>
            </View>
          }}
          data={data}
        />
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
    flex: 1,
  },
  listItem: {

  }
});
