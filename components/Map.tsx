import React, { Fragment, useState } from 'react'
import { useTheme } from '@nextui-org/react'
import Mapbox, { Source, Layer, Marker } from 'react-map-gl'
import Image from 'next/image'
import { Trails, Rating } from '../types'

interface Props {
  trails: Trails
}

const Map = ({ trails }: Props) => {
  const { theme } = useTheme()

  // const [showPopup, setShowPopup] = useState(false)
  const [viewport, setViewport] = useState({
    latitude: 64.128288,
    longitude: -21.827774,
    zoom: 8,
  })

  const getColor = (rating: number | undefined) => {
    switch (rating) {
      case 1:
        return theme?.colors.green500.value
      case 2:
        return theme?.colors.blue500.value
      case 3:
        return theme?.colors.red500.value
      case 4:
        return theme?.colors.black.value
      default:
        return theme?.colors.green500.value
    }
  }

  return (
    <Mapbox
      mapStyle="mapbox://styles/mapbox/streets-v11"
      mapboxAccessToken={process.env.MAPBOX_TOKEN}
      {...viewport}
      onMove={(evt) => setViewport(evt.viewState)}
    >
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
                  'line-color': getColor(rating),
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
