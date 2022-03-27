import { ReactElement, ReactNode } from 'react'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import { NextUIProvider } from '@nextui-org/react'
import 'mapbox-gl/dist/mapbox-gl.css'
import theme from '../theme'
import MapLayout from '../layouts/MapLayout'
import '../styles/globals.css'

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

function MyApp({ Component, pageProps, router }: AppPropsWithLayout) {
  if (router.pathname.startsWith('/trails')) {
    return (
      <NextUIProvider theme={theme}>
        <MapLayout>
          <Component {...pageProps} />
        </MapLayout>
      </NextUIProvider>
    )
  }

  return (
    <NextUIProvider theme={theme}>
      <Component {...pageProps} />
    </NextUIProvider>
  )
}

export default MyApp
