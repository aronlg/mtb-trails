import type { NextPage, GetStaticProps } from 'next'
import { Grid, Text } from '@nextui-org/react'
import { Trails } from '../types'
import Map from '../components/Map'
import * as gpxUtils from '../utils/gpx'

interface Props {
  trails: Trails
}

const Trails: NextPage<Props> = ({ trails }) => {
  return (
    <Grid.Container>
      <Grid md={6} style={{ padding: '80px' }}>
        <Text h2>Hjólaleiðir</Text>
      </Grid>
      <Grid md={6} css={{ h: '100vh' }}>
        <Map trails={trails} />
      </Grid>
    </Grid.Container>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      trails: gpxUtils.routes,
    },
  }
}

export default Trails
