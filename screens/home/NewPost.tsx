import { useState, useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Image, Platform, StyleSheet, TouchableOpacity } from 'react-native';
import { useFirestoreCollectionMutation } from "@react-query-firebase/firestore";
import { Input } from "@rneui/themed";

import { HomeScreenProps } from '../../navigation/types';
import { postsCollection, newPost, uploadImageAsync } from '../../services/posts';
import Colors from '../../constants/Colors';
import * as ImagePicker from 'expo-image-picker';
import { Text, View } from '../../components/Themed';

export default function NewPostModal(props: HomeScreenProps<'NewPost'>) {
  const [message, setMessage] = useState<string>();

  const [image, setImage] = useState<ImagePicker.ImageInfo>();

  const inputRef = useRef();
  const mutation = useFirestoreCollectionMutation(postsCollection);

  const submitPost = async () => {
    const url = image?.uri && await uploadImageAsync(image.uri);
    const data = await newPost(message, url);
    await mutation.mutateAsync(data);
    props.navigation.goBack();
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0,
    });

    if (result.cancelled === false) {
      setImage(result);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>New post</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

      <View style={styles.body}>
        <Input ref={inputRef}
          inputContainerStyle={styles.input} value={message} placeholder={`What's on your mind?`} onChangeText={setMessage}
          leftIcon={<TouchableOpacity onPress={pickImage}>
            <MaterialIcons name="add-a-photo" size={24} color="black" />
          </TouchableOpacity>}
          rightIcon={<TouchableOpacity onPress={submitPost}>
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
