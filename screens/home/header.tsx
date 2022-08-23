import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button } from "@rneui/themed";
import { BottomTabHeaderProps } from '@react-navigation/bottom-tabs';

import { Text, View } from '../../components/Themed';

export default function HomeHeader(props: BottomTabHeaderProps) {
    const insets = useSafeAreaInsets();
    return (
        <View style={[{ paddingTop: insets.top, }, styles.container]}>
            <View style={styles.leftSide}>
                <Text style={styles.text}>Header</Text>
            </View>
            <View style={styles.rightSide} >
                <Ionicons name="create-outline" size={28} color="black" />
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
