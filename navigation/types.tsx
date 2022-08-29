import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps, NativeStackNavigationProp } from '@react-navigation/native-stack';

declare global {
  namespace ReactNavigation {
    interface AuthParamList extends AuthStackParamList { }
    interface RootParamList extends RootStackParamList { }
  }
}

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};

export type AuthScreenProps<Screen extends keyof AuthStackParamList> = NativeStackScreenProps<AuthStackParamList, Screen>;

export type RootStackParamList = {
  Root: BottomTabScreenProps<BottomTabParamList>;
  NotFound: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> = BottomTabScreenProps<RootStackParamList, Screen>;

export type BottomTabParamList = {
  Home: NativeStackNavigationProp<HomeStackParamList>;
  Matching: undefined;
  Walking: undefined;
  Profile: undefined;
};

export type BottomTabProps<Screen extends keyof BottomTabParamList> =
  CompositeScreenProps<BottomTabScreenProps<BottomTabParamList, Screen>, NativeStackScreenProps<RootStackParamList>>;

export type HomeStackParamList = {
  Feed: undefined;
  NewPost: undefined;
};

export type HomeScreenProps<Screen extends keyof HomeStackParamList> =
  CompositeScreenProps<BottomTabProps<keyof BottomTabParamList>, NativeStackScreenProps<HomeStackParamList, Screen>>;
