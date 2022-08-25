import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { QueryClient, QueryClientProvider } from 'react-query'

import './config/firebase';
import useCachedResources from './hooks/useCachedResources';
import Navigation from './navigation';

const queryClient = new QueryClient();

export default function App() {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <QueryClientProvider client={queryClient}>
          <Navigation />
          <StatusBar />
        </QueryClientProvider>
      </SafeAreaProvider>
    );
  }
}
