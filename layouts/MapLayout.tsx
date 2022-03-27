import useSWR from 'swr'
import { Grid, Container } from '@nextui-org/react'
import Map from '../components/Map'

interface Props {
  children: React.ReactNode
}

const fetcher = (url: string) => fetch(url).then((res) => res.json())

function MapData() {
  const { data, error } = useSWR('/api/trails', fetcher)

  if (!data) return <p>Loading...</p>
  if (error) return <p>Error</p>

  return <Map trails={data.trails} />
}

const MapLayout = ({ children }: Props) => {
  return (
    <Grid.Container justify="center">
      <Grid xs={12} sm={5} direction="column" css={{ padding: '$15' }}>
        {children}
      </Grid>
      <Grid xs={12} sm={7} css={{ h: '100vh' }}>
        <MapData />
      </Grid>
    </Grid.Container>
  )
}

export default MapLayout
