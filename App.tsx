import 'react-native-gesture-handler';
import {StatusBar} from 'expo-status-bar';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {useCachedResources} from '@hooks';
import {ColorScheme} from '@constants';
import {LoadingScreen} from '@components';
import {Provider} from 'react-redux';
import {useEffect} from 'react';
import {NotifyHelper} from '@helpers';
import store from '@redux/store';
import AppNavigation from './navigation/AppNavigation';

const queryClient = new QueryClient();

export default function App() {
  const {isLoading} = useCachedResources();

  // setup
  useEffect(() => {
    NotifyHelper.registerForPushNotificationsAsync();
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: ColorScheme.primaryColor}}>
      <SafeAreaProvider>
        <Provider store={store}>
          <QueryClientProvider client={queryClient}>
            <AppNavigation />
            <StatusBar style="auto" />
          </QueryClientProvider>
        </Provider>
        <StatusBar style="auto" />
      </SafeAreaProvider>
    </SafeAreaView>
  );
}
