import type { NextPage } from 'next'
import Head from 'next/head'
import { Container, Spacer } from '@nextui-org/react'
// import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Iceland Mountain Biking Trails</title>
        <meta name="description" content="Explore trails in Iceland" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Container>
          <Spacer y={3} />
          <h1>Hjólaleiðir</h1>
        </Container>
      </main>
    </div>
  )
}

export default Home
