import {Tokens} from '@services';
import * as SecureStore from 'expo-secure-store';

export async function setTokensAsync(tokens: null | Tokens) {
  if (tokens) {
    await SecureStore.setItemAsync('RefreshToken', tokens.refresh_token);
    await SecureStore.setItemAsync('AccessToken', tokens.access_token);
  } else {
    await SecureStore.deleteItemAsync('RefreshToken');
    await SecureStore.deleteItemAsync('AccessToken');
  }
}

export async function getTokensAsync() {
  let refresh_token = await SecureStore.getItemAsync('RefreshToken');
  let access_token = await SecureStore.getItemAsync('AccessToken');

  return refresh_token && access_token ? {refresh_token, access_token} : null;
}

export async function eraseTokensAsync() {
  await SecureStore.deleteItemAsync('RefreshToken');
  await SecureStore.deleteItemAsync('AccessToken');
}
