import type { NextPage, GetStaticProps } from 'next'
import { TrailsType } from '../../types'
import Trail from '../../components/Trail'

interface Props {
  trails: TrailsType
}

const Trails: NextPage<Props> = ({ trails }) => (
  <>
    {trails.map((trail, i) => (
      <Trail trail={trail} key={i} />
    ))}
  </>
)

export const getStaticProps: GetStaticProps = async () => {
  const gpxUtils = require('../../utils/gpx')

  return {
    props: {
      trails: gpxUtils.trails,
    },
  }
}

export default Trails
