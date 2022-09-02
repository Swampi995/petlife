import { StyleSheet, Dimensions, Image, ActivityIndicator } from 'react-native';
import { query, startAfter } from 'firebase/firestore';
import { FlashList } from "@shopify/flash-list";
import { useFirestoreInfiniteQuery } from "@react-query-firebase/firestore";
import { Text, View } from '../../components/Themed';
import Colors from '../../constants/Colors';
import { postsQuery } from '../../services/posts';
import { HomeScreenProps } from '../../navigation/types';
import LoadingImage from '../../assets/images/icon.png';

export default function FeedScreen({ navigation }: HomeScreenProps<'Feed'>) {
  const { width } = Dimensions.get('screen');

  const posts = useFirestoreInfiniteQuery('posts', postsQuery, (snapshot) => {
    const lastDocument = snapshot.docs[snapshot.docs.length - 1];
    return lastDocument ? query(postsQuery, startAfter(lastDocument)) : query(postsQuery);
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
            return <View style={styles.listItem}>
              {item.imageUrl && <Image loadingIndicatorSource={LoadingImage} style={[{ width }, styles.itemImage]} source={{ uri: item.imageUrl }} />}
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
  itemImage: {
    height: 300,
    resizeMode: 'cover',
  },
  listItem: {
    borderColor: Colors.grey,
    borderWidth: 0.5,
    borderRadius: 16,
    paddingVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
