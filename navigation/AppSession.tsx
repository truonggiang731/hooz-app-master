import React, {useEffect} from 'react';
import {ErrorScreen, LoadingScreen} from '@components';
import {TokensHelper} from '@helpers';
import {isAxiosError} from 'axios';
import {Alert} from 'react-native';
import {SignInParams, SignUpParams} from '../services/Types';
import * as SessionService from '../services/SessionService';
import useAppDispatch from '../hooks/useAppDispatch';
import {setTokens} from '@redux/sessionSlide';

export const SessionProvider = ({children}: {children: React.ReactNode}) => {
  const dispatch = useAppDispatch();

  const [status, setStatus] = React.useState<{
    isLoading: boolean;
    isError: boolean;
  }>({isLoading: false, isError: false});

  const signUp = async (signUpParams: SignUpParams) => {
    setStatus({isLoading: true, isError: false});

    try {
      const _tokens = await SessionService.signUpAsync(signUpParams);

      await TokensHelper.setTokensAsync(_tokens);

      dispatch(setTokens(_tokens));
    } catch (error) {
      if (isAxiosError(error)) {
        if (error.response) {
          Alert.alert('Lỗi', error.response.data.message);
        } else {
          Alert.alert('Lỗi', 'Vui lòng kiểm tra lại kết nối mạng');
        }
      } else {
        Alert.alert('Lỗi', 'Vui lòng kiểm tra lại kết nối mạng');
      }
    } finally {
      setStatus({isLoading: false, isError: false});
    }
  };

  const signIn = async (signInParams: SignInParams) => {
    setStatus({isLoading: true, isError: false});

    try {
      const _tokens = await SessionService.signInAsync(signInParams);

      await TokensHelper.setTokensAsync(_tokens);

      dispatch(setTokens(_tokens));
    } catch (error) {
      if (isAxiosError(error)) {
        if (error.response) {
          Alert.alert('Lỗi', error.response.data.message);
        } else {
          Alert.alert('Lỗi', 'Vui lòng kiểm tra lại kết nối mạng');
        }
      } else {
        Alert.alert('Lỗi', 'Vui lòng kiểm tra lại kết nối mạng');
      }
    } finally {
      setStatus({isLoading: false, isError: false});
    }
  };

  const signOut = async () => {
    setStatus({isLoading: true, isError: false});

    try {
      if (tokens) {
        await SessionService.signOutAsync(tokens);
      }
    } catch (error) {
    } finally {
      await TokensHelper.eraseTokensAsync();
      dispatch(setTokens(null));
      setStatus({isLoading: false, isError: false});
    }
  };

  const refreshTokens = async () => {
    try {
      if (tokens) {
        const _tokens = await SessionService.refreshTokensAsync(tokens);

        await TokensHelper.setTokensAsync(_tokens);

        dispatch(setTokens(_tokens));
      }

      return Promise.resolve();
    } catch (error) {
      if (isAxiosError(error) && error.response?.status == 422) {
        await TokensHelper.eraseTokensAsync();
        dispatch(setTokens(null));
      } 

      return Promise.reject(error);
    }
  }

  const trySignIn = async () => {
    setStatus({isLoading: true, isError: false});

    try {
      let _tokens = await TokensHelper.getTokensAsync();

      if (_tokens) {
        _tokens = await SessionService.refreshTokensAsync(_tokens);

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
        children
      )}
    </>
  );
};
