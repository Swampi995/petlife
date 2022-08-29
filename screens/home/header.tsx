import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NativeStackHeaderProps } from '@react-navigation/native-stack';

import { Text, View } from '../../components/Themed';

export default function HomeHeader(props: NativeStackHeaderProps) {
    const insets = useSafeAreaInsets();
    return (
        <View style={[{ paddingTop: insets.top, }, styles.container]}>
            <View style={styles.leftSide}>
                <Text style={styles.text}>Header</Text>
            </View>
            <View style={styles.rightSide} >
                <TouchableOpacity onPress={() => props.navigation.navigate('NewPost')}>
                    <Ionicons name="create-outline" size={28} color="black" />
                </TouchableOpacity>
                <MaterialIcons name="search" size={28} color="black" />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
    },
    leftSide: {
        flex: 4,
    },
    text: {
        fontWeight: '600',
        fontSize: 24,
    },
    rightSide: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
});
