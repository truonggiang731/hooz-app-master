import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {ColorScheme} from '@constants';
import {ErrorScreen, LoadingScreen} from '@components';
import {useAppDispatch, useAppSelector} from '@hooks';
import AppStack from './AppStack';
import SessionStack from './SessionStack';
import {useEffect, useState} from 'react';
import {NotifyHelper, ReadingOptionHelper, TokensHelper} from '@helpers';
import {SessionService} from '@services';
import {setTokens} from '@redux/sessionSlide';
import {isAxiosError} from 'axios';
import {setReadingOption} from '@redux/readingOptionSlide';

export default function AppNavigation() {
  const [status, setStatus] = useState<{
    isLoading: boolean;
    isError: boolean;
  }>({isLoading: false, isError: false});

  const {tokens} = useAppSelector(state => state.session);
  const dispatch = useAppDispatch();

  const trySignIn = async () => {
    setStatus({isLoading: true, isError: false});

    try {
      let _tokens = await TokensHelper.getTokensAsync();

      if (_tokens) {
        _tokens = await SessionService.refreshTokensAsync(_tokens, await NotifyHelper.getExpoPushTokenAsync());

        await TokensHelper.setTokensAsync(_tokens);

        dispatch(setTokens(_tokens));
      }
      setStatus({isLoading: false, isError: false});
    } catch (error) {
      if (isAxiosError(error)) {
        if (error.response?.status == 422) {
          setStatus({isLoading: false, isError: false});
        } else {
          setStatus({isLoading: false, isError: true});
        }
      } else {
        setStatus({isLoading: false, isError: true});
      }
    }
  };

  useEffect(() => {
    trySignIn();
  }, []);

  return (
  <>
    {status.isError ? (
      <ErrorScreen onButtonPress={trySignIn} />
    ) : status.isLoading ? (
      <LoadingScreen />
    ) : (
      <NavigationContainer
        theme={{dark: true, colors: {background: ColorScheme.primaryColor}} as typeof DefaultTheme}
        fallback={<LoadingScreen />}
      >
        {tokens ? <AppStack /> : <SessionStack />}
      </NavigationContainer>
    )}
  </>
  );
}
