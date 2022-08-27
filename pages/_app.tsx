import '../styles/globals.css'
import type { AppProps } from 'next/app'
import axiosConfig from '../api-config/axiosConfig';
import { SWRConfig } from 'swr';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig value={{ fetcher: url => axiosConfig.get(url), shouldRetryOnError: false }}>
      <Component {...pageProps} />
    </SWRConfig>
  )
}

export default MyApp
