import { Rating } from '../types'

interface TrailsJSON {
  [key: string]: {
    description: string
    rating: Rating
    location: string
  }
}

const trails: TrailsJSON = {
  hvaleyrarvatn: {
    description: 'Short trail in Hafnarfjörður',
    rating: 1,
    location: 'Hafnarfjörður',
  },
  jadarinn: {
    description: 'From Bláfjöll to Heiðmörk',
    rating: 3,
    location: 'Hafnarfjörður',
  },
  helgafell: {
    description: 'Climb hard for the steepness!',
    rating: 4,
    location: 'Hafnarfjörður',
  },
  storhofdi: {
    description: 'Fun area near Hvaleyravatn',
    rating: 2,
    location: 'Hafnarfjörður',
  },
}

module.exports = { trails }
