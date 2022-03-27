const fs = require('fs')
const path = require('path')
const toGeoJson = require('@mapbox/togeojson')
const turflength = require('@turf/length').default
const xmldom = require('xmldom')
const data = require('../data/trails')

const TRAILS_PATH = path.join(process.cwd(), 'public', 'gpx')

const trailFilePaths = fs
  .readdirSync(TRAILS_PATH)
  .filter((p) => /\.gpx?$/.test(p))

const trails = trailFilePaths.map((filePath) => {
  const source = new xmldom.DOMParser().parseFromString(
    fs.readFileSync(path.join(TRAILS_PATH, filePath), 'utf8')
  )
  const slug = filePath.replace('.gpx', '')
  const trail = data.trails[slug]

  const geoJson = toGeoJson.gpx(source)

  // Distance
  const distance = turflength(geoJson)

  // Elevation
  const { coordinates } = geoJson.features[0].geometry
  let elevation = 0
  coordinates.forEach((coord, index) => {
    if (index === coordinates.length - 1) return
    const elevationDifference =
      coordinates[index + 1][2] - coordinates[index][2]
    if (elevationDifference > 0) elevation += elevationDifference
  })

  return {
    distance,
    elevation,
    geoJson: trail?.geoJson || geoJson,
    gpxGeoJson: geoJson,
    slug,
    description: trail?.description || null,
    rating: trail?.rating || null,
    location: trail?.location || null,
  }
})

module.exports = { trails }
