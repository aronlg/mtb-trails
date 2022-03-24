import type { AppProps } from 'next/app'
import { NextUIProvider } from '@nextui-org/react'
import '../styles/globals.css'
import theme from '../theme'
import 'mapbox-gl/dist/mapbox-gl.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NextUIProvider theme={theme}>
      <Component {...pageProps} />
    </NextUIProvider>
  )
}

export default MyApp
