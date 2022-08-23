import { MaterialIcons, FontAwesome, Ionicons, Foundation, MaterialCommunityIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { Pressable } from 'react-native';

import { useAuthentication } from '../hooks/useAuthentication';
import ModalScreen from '../screens/common/ModalScreen';
import NotFoundScreen from '../screens/common/NotFoundScreen';
import HomeScreen from '../screens/home';
import WalkingScreen from '../screens/walking';
import ProfileScreen from '../screens/profile';
import MatchingScreen from '../screens/matching';
import LoginScreen from '../screens/auth/Login';
import RegisterScreen from '../screens/auth/Register';
import { AuthStackParamList, RootStackParamList, RootTabParamList, RootTabScreenProps } from './types';
import LinkingConfiguration from './LinkingConfiguration';

export default function Navigation() {
  const { user } = useAuthentication();
  return (
    <NavigationContainer linking={LinkingConfiguration}>
      {user ? <RootNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
}

const AuthStack = createNativeStackNavigator<AuthStackParamList>();

function AuthNavigator() {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen name="Login" component={LoginScreen} />
      <AuthStack.Screen name="Register" component={RegisterScreen} />
    </AuthStack.Navigator>
  );
}

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name="Modal" component={ModalScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {

  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarShowLabel: false,
      }}
    >
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={({ navigation }: RootTabScreenProps<'Home'>) => ({
          tabBarIcon: ({ color }) => <MaterialIcons name="home" size={28} color={color} />,
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate('Modal')}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}>
              <FontAwesome
                name="info-circle"
                size={25}
                style={{ marginRight: 15 }}
              />
            </Pressable>
          ),
        })}
      />
      <BottomTab.Screen
        name="Matching"
        component={MatchingScreen}
        options={{
          title: 'Matching',
          tabBarIcon: ({ color }) => <Ionicons name="md-paw" size={24} color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Walking"
        component={WalkingScreen}
        options={{
          title: 'Walking',
          tabBarIcon: ({ color }) => <Foundation name="guide-dog" size={30} color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="account" size={26} color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}
