import {
  FlexibleXYPlot,
  AreaSeries,
  YAxis,
  HorizontalGridLines,
  LineSeries,
} from 'react-vis'
import { theme } from '@nextui-org/react'
import type { CordsType } from '../types'

interface Props {
  coordinates: Array<CordsType>
}

const Elevation = ({ coordinates }: Props) => {
  // @ts-ignore
  const data = coordinates.map((x, i) => ({ x: i, y: parseInt(x[2], 10) }))

  return (
    <div>
      <FlexibleXYPlot height={150}>
        <HorizontalGridLines />
        <AreaSeries
          curve="curveLinear"
          data={data}
          color={theme.colors.cyan400.value}
        />
        <LineSeries data={data} color={theme.colors.cyan600.value} />
        <YAxis />
      </FlexibleXYPlot>
    </div>
  )
}

export default Elevation
