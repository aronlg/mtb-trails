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
    description: 'Stuttur hringur í Hafnarfirði.',
    rating: 1,
    location: 'Hafnarfjörður',
  },
  storhofdi: {
    description: 'Skemmtilegt svæði kringum Hvaleyrarvatn.',
    rating: 2,
    location: 'Hafnarfjörður',
  },
  jadarinn: {
    description: 'Frá Blafjöllum að Heiðmörk.',
    rating: 3,
    location: 'Hafnarfjörður',
  },
  helgafell: {
    description:
      'Klifraðu í gegnum helvíti fyrir frábæra upplifun á niðurleið.',
    rating: 4,
    location: 'Hafnarfjörður',
  },
  laugavegur: {
    description:
      'Landmannalaugar til Þórsmerkur, í gegnum Hrafntinnusker, Álftavatn og Emstrur.',
    rating: 4,
    location: 'Landmannalaugar',
  },
}

module.exports = { trails }
