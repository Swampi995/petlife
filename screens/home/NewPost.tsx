import { useState, useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { Platform, StyleSheet, TouchableOpacity } from 'react-native';
import { useFirestoreCollectionMutation } from "@react-query-firebase/firestore";
import { Input } from "@rneui/themed";

import { HomeScreenProps } from '../../navigation/types';
import { postsCollection, newPost } from '../../services/posts';
import Colors from '../../constants/Colors';
import { Text, View } from '../../components/Themed';

export default function NewPostModal(props: HomeScreenProps<'NewPost'>) {
  const [message, setMessage] = useState<string>();
  const inputRef = useRef();

  const mutation = useFirestoreCollectionMutation(postsCollection);

  const submitPost = async () => {
    if (!message) {
      return;
    }

    await mutation.mutateAsync(newPost(message));
    props.navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>New post</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

      <View style={styles.body}>
        <Input ref={inputRef}
          inputContainerStyle={styles.input} value={message} placeholder={`What's on your mind?`} onChangeText={setMessage}
          rightIcon={<TouchableOpacity onPress={submitPost} disabled={!message}>
            <Ionicons name="ios-send" size={24} color="black" />
          </TouchableOpacity>} />
      </View>
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
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
  input: {
    borderBottomWidth: 0,
  },
  body: {
    flex: 1,
  }
});
