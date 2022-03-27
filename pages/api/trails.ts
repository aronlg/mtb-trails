import type { NextApiRequest, NextApiResponse } from 'next'
import { TrailsType } from '../../types'
import * as gpxUtils from '../../utils/gpx'

type Data = {
  trails: TrailsType
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json({ trails: gpxUtils.trails })
}
