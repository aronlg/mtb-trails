import type { NextPage, GetStaticProps, GetStaticPaths } from 'next'
import { Text, Spacer } from '@nextui-org/react'
import { TrailsType, TrailType } from '../../types'
import Elevation from '../../components/Elevation'

interface Props {
  trails: TrailsType
  trail: TrailType
}

const TrailPage: NextPage<Props> = ({ trail }: Props) => {
  const { description, geoJson, gpxGeoJson, distance, rating } = trail
  // @ts-ignore
  const { name } = geoJson.features[0].properties

  return (
    <>
      <Text h1>{name}</Text>
      <Text size={20}>{description}</Text>
      <Spacer y={2} />
      {/* @ts-ignore */}
      <Elevation coordinates={gpxGeoJson.features[0].geometry.coordinates} />
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const gpxUtils = require('../../utils/gpx')

  const paths = gpxUtils.trails.map((trail: TrailType) => ({
    params: { slug: trail.slug },
  }))

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const gpxUtils = require('../../utils/gpx')

  const { trails } = gpxUtils
  const trail = trails.filter((trail: TrailType) => trail.slug === params?.slug)

  return {
    props: {
      trail: trail[0],
    },
  }
}

export default TrailPage
