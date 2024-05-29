import {DocumentService} from '@services';
import {ErrorScreen, LoadingScreen} from '@components';
import { WebView } from 'react-native-webview';
import {useMemo} from 'react';
import {useQuery} from '@tanstack/react-query';
import ColorScheme from '../constants/ColorScheme';

export default function PolicyAndTermScreen() {
  const query = useQuery({
    queryKey: ['documents', 'policy_and_terms'],
    queryFn: () => DocumentService.getPolicyAndTermsAsync()
  })

  const html = useMemo(() => `<div style="padding: 0px 8px; color: ${ColorScheme.textColor}">${query.data ? query.data.policy_and_terms ? query.data.policy_and_terms.value : '' : ''}</div>`, [query.data]);

  if (query.isLoading) {
    return <LoadingScreen />
  }

  if (query.isError) {
    return <ErrorScreen />
  }

  return (
    <WebView
      style={{resizeMode: 'cover', flex: 1, backgroundColor: ColorScheme.primaryColor, color: ColorScheme.textColor}}
      source={{html: html}}
      scalesPageToFit={false}
    />
  )
}
