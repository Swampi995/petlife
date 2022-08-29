import { MaterialIcons, Ionicons, Foundation, MaterialCommunityIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';

import { useAuthentication } from '../hooks/useAuthentication';
import NewPostModal from '../screens/home/NewPost';
import NotFoundScreen from '../screens/common/NotFoundScreen';
import FeedScreen from '../screens/home/Feed';
import HomeHeader from '../screens/home/Header';
import WalkingScreen from '../screens/walking';
import ProfileScreen from '../screens/profile';
import MatchingScreen from '../screens/matching';
import LoginScreen from '../screens/auth/Login';
import RegisterScreen from '../screens/auth/Register';
import { AuthStackParamList, RootStackParamList, BottomTabParamList, BottomTabProps, HomeStackParamList } from './types';
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
    </Stack.Navigator>
  );
}

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

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
        component={HomeNavigator}
        options={({ navigation }: BottomTabProps<'Home'>) => ({
          headerShown: false,
          tabBarIcon: ({ color }) => <MaterialIcons name="home" size={28} color={color} />,
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

const HomeStack = createNativeStackNavigator<HomeStackParamList>();

function HomeNavigator() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Feed" component={FeedScreen} options={{ header: (props) => <HomeHeader {...props} /> }} />
      <HomeStack.Group screenOptions={{ presentation: 'modal', headerShown: false }}>
        <HomeStack.Screen name="NewPost" component={NewPostModal} />
      </HomeStack.Group>
    </HomeStack.Navigator>
  );
}