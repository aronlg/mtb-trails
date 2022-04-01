import { GeoJSON } from './geojson'

export type Rating = 1 | 2 | 3 | 4 | 5

export interface CordsType {
  lat: number
  lon: number
  elevation: number
}

export interface TrailType {
  slug: string
  distance: number
  elevation: number
  geoJson: GeoJSON.FeatureCollection<GeoJSON.Geometry>
  gpxGeoJson: GeoJSON.FeatureCollection<GeoJSON.Geometry>
  rating?: Rating
  description?: string
  location?: string
  color?: string
}

export type TrailsType = Array<TrailType>
