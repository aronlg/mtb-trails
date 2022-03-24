import { GeoJSON } from './geojson'

export type Rating = 1 | 2 | 3 | 4 | 5

export interface Trail {
  slug: string
  distance: number
  elevation: number
  geoJson: GeoJSON.FeatureCollection
  rating?: Rating
  description?: string
  location?: string
  color?: string
}

export type Trails = Array<Trail>
