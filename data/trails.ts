import { Rating } from '../types'

interface TrailsJSON {
  [key: string]: {
    description?: string
    rating: Rating
    location: string
  }
}

const trails: TrailsJSON = {
  hvaleyrarvatn: {
    description: 'Stuttur hringur í Hafnarfirði',
    rating: 1,
    location: 'Hafnarfjörður',
  },
  storhofdi: {
    description: 'Skemmtilegt svæði kringum Hvaleyrarvatn',
    rating: 2,
    location: 'Hafnarfjörður',
  },
  jadarinn: {
    description: 'Frá Blafjöllum að Heiðmörk',
    rating: 3,
    location: 'Hafnarfjörður',
  },
  helgafell: {
    rating: 4,
    location: 'Hafnarfjörður',
  },
}

module.exports = { trails }
