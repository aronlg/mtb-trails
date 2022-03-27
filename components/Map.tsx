import { Fragment, useState, useCallback, useRef } from 'react'
// import { Tooltip } from '@nextui-org/react'
import Mapbox, {
  NavigationControl,
  GeolocateControl,
  Source,
  Layer,
  Marker,
} from 'react-map-gl'
import Image from 'next/image'
import { colorByDifficulty } from '../helpers'
import { TrailsType } from '../types'

interface Props {
  trails: TrailsType
  latitude?: number
  longitude?: number
}

const lat = 64.128288
const lng = -21.827774
const zoom = 8

const Map = ({ trails, latitude = lat, longitude = lng }: Props) => {
  // const map = useRef()
  const [viewport, setViewport] = useState({
    latitude,
    longitude,
    zoom,
  })

  // const onLoad = () => {
  //   console.log(map)
  // }

  return (
    <Mapbox
      // ref={map}
      mapStyle="mapbox://styles/mapbox/streets-v11"
      mapboxAccessToken={process.env.MAPBOX_TOKEN}
      {...viewport}
      onMove={(evt) => setViewport(evt.viewState)}
      // onLoad={onLoad}
    >
      <NavigationControl />
      <GeolocateControl />
      {trails.map((trail) => {
        const {
          slug,
          rating,
          geoJson: { features },
        } = trail
        const { geometry } = features[0]

        return (
          <Fragment key={slug}>
            {geometry.type === 'LineString' && (
              <Marker
                latitude={geometry.coordinates[0][1]}
                longitude={geometry.coordinates[0][0]}
              >
                <div>
                  <Image
                    src="/files/images/marker.svg"
                    alt=""
                    width="50"
                    height="30"
                  />
                </div>
              </Marker>
            )}
            <Source type="geojson" data={trail.geoJson}>
              <Layer
                id={slug}
                type="line"
                source={slug}
                layout={{
                  'line-join': 'round',
                  'line-cap': 'round',
                }}
                paint={{
                  'line-color': colorByDifficulty(rating),
                  'line-width': 4,
                }}
              />
            </Source>
          </Fragment>
        )
      })}
    </Mapbox>
  )
}

export default Map
