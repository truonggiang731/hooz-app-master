import * as SplashScreen from 'expo-splash-screen';
import * as React from 'react';
export default function useCachedResources() {
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHideAsync();
      } catch (error) {
        console.warn(error);
      } finally {
        setIsLoading(false);
        SplashScreen.hideAsync();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  return {isLoading};
}
