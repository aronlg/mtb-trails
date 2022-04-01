import { Fragment, useState, useMemo, useRef, useLayoutEffect } from 'react'
import { useRouter } from 'next/router'
import Mapbox, {
  NavigationControl,
  GeolocateControl,
  Source,
  Layer,
  Popup,
  MapRef,
  MapLayerMouseEvent,
} from 'react-map-gl'
import bbox from '@turf/bbox'
import { colorByDifficulty } from '../helpers'
import { TrailsType } from '../types'

interface Props {
  trails: TrailsType
  latitude?: number
  longitude?: number
}

interface HoverInfo {
  longitude: number
  latitude: number
  name: string
}

type HoverInfoState = HoverInfo | null

const lat = 64.2559
const lng = -21.1295
const zoom = 8

const Map = ({ trails, latitude = lat, longitude = lng }: Props) => {
  const mapRef = useRef<MapRef>(null)
  const [mapLoaded, setMapLoaded] = useState(false)
  const [mapMoving, setMapMoving] = useState(false)
  const [viewport, setViewport] = useState({
    latitude,
    longitude,
    zoom,
  })
  const [hoverInfo, setHoverInfo] = useState<HoverInfoState>(null)
  const router = useRouter()
  const query = router.query.slug

  useLayoutEffect(() => {
    if (query && mapLoaded && !mapMoving) {
      trails.forEach((trail) => {
        const {
          slug,
          geoJson: { features },
        } = trail

        if (slug === query) {
          const [minLng, minLat, maxLng, maxLat] = bbox(trail.geoJson)
          mapRef.current?.fitBounds(
            [
              [minLng, minLat],
              [maxLng, maxLat],
            ],
            { padding: 80, duration: 1000 }
          )
        }
      })
    } else {
      if (mapLoaded && !mapMoving) {
        mapRef.current?.flyTo({
          center: [lng, lat],
          essential: true,
          zoom,
        })
      }
    }
  }, [query, mapLoaded])

  const onLoad = () => {
    setMapLoaded(true)
  }

  const handleClick = (e: MapLayerMouseEvent) => {
    // @ts-ignore
    const feature = e.features[0]
    setMapMoving(true)
    router.push(`/trails/${feature.layer.id}`)
    const [minLng, minLat, maxLng, maxLat] = bbox(feature)
    mapRef.current?.fitBounds(
      [
        [minLng, minLat],
        [maxLng, maxLat],
      ],
      { padding: 80, duration: 1000 }
    )
    setTimeout(() => {
      setMapMoving(false)
    }, 1000)
  }

  const onHover = (e: MapLayerMouseEvent) => {
    const feature = e.features && e.features[0]
    setHoverInfo({
      longitude: e.lngLat.lng,
      latitude: e.lngLat.lat,
      name: feature && feature.properties?.name,
    })
  }

  const handleMouseEnter = (e: MapLayerMouseEvent) => {
    // @ts-ignore
    const feature = e.features[0]
    if (mapRef.current) {
      mapRef.current.getCanvas().style.cursor = 'pointer'
    }
  }

  const handleMouseLeave = () => {
    if (mapRef.current) {
      mapRef.current.getCanvas().style.cursor = ''
    }
    setHoverInfo(null)
  }

  let layerIds: Array<string> = []
  trails.forEach((trail) => {
    layerIds.push(trail.slug)
  })

  const activeTrail = (hoverInfo && hoverInfo.name) || ''

  return (
    <Mapbox
      style={{ height: '100%' }}
      ref={mapRef}
      mapStyle="mapbox://styles/mapbox/streets-v11"
      mapboxAccessToken={process.env.MAPBOX_TOKEN}
      interactiveLayerIds={layerIds}
      onMove={(evt) => setViewport(evt.viewState)}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseMove={onHover}
      onMouseLeave={handleMouseLeave}
      onLoad={onLoad}
      {...viewport}
    >
      <NavigationControl />
      <GeolocateControl />
      {trails.map((trail) => {
        const {
          slug,
          rating,
          geoJson: { features },
        } = trail

        // const { coordinates: startCoordinates } = features[0].geometry
        // const { coordinates: endCoordinates } =
        //   features[features.length - 1].geometry

        const filter = useMemo(() => ['==', 'name', activeTrail], [activeTrail])

        console.log('hoverInfo', hoverInfo)

        return (
          <Fragment key={slug}>
            {/* {geometry.type === 'LineString' && (
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
            )} */}
            <Source type="geojson" data={trail.geoJson} key={slug} id={slug}>
              <Layer
                id={`${slug}-line`}
                type="line"
                source={slug}
                layout={{
                  'line-join': 'round',
                  'line-cap': 'round',
                }}
                paint={{
                  'line-color': colorByDifficulty(rating),
                  'line-width': slug === query ? 6 : 4,
                  // 'line-width-transition': { duration: 3000, delay: 1000 },
                }}
              />
              <Layer
                id={`${slug}-highlight`}
                type="line"
                source={slug}
                layout={{
                  'line-join': 'round',
                  'line-cap': 'round',
                }}
                paint={{
                  'line-color': colorByDifficulty(rating),
                  'line-width': 6,
                  'line-width-transition': { duration: 300 },
                }}
                filter={filter}
              />
              <Layer
                id={slug}
                type="fill"
                source={slug}
                paint={{
                  'fill-color': 'transparent',
                  'fill-outline-color': 'transparent',
                }}
              />
              {/* <Layer
                id={`${slug}-start`}
                type="circle"
                source={{
                  type: 'geojson',
                  data: {
                    type: 'Feature',
                    properties: {
                      description: 'Trail start',
                    },
                    geometry: {
                      type: 'Point',
                      coordinates: [-21.92768096923828, 64.04208549178132],
                    },
                  },
                }}
                paint={{
                  'circle-color': 'purple',
                  'circle-radius': 5,
                  'circle-opacity': 1,
                }}
              /> */}
              {/* <Layer
                id={`${slug}-end`}
                type="circle"
                source={{
                  type: 'geojson',
                  data: {
                    type: 'Feature',
                    properties: {
                      description: 'Trail end',
                    },
                    geometry: {
                      type: 'Point',
                      coordinates: endCoordinates.pop(),
                    },
                  },
                }}
                paint={{
                  'circle-color': 'red',
                  'circle-radius': 5,
                  'circle-opacity': 1,
                }}
              /> */}
              {activeTrail && hoverInfo && (
                <Popup
                  longitude={hoverInfo.longitude}
                  latitude={hoverInfo.latitude}
                  offset={[0, -10]}
                  closeButton={false}
                  className="county-info"
                >
                  {activeTrail}
                </Popup>
              )}
            </Source>
          </Fragment>
        )
      })}
    </Mapbox>
  )
}

export default Map
