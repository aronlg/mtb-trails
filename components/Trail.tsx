import Link from 'next/link'
import { Grid, Card, Text, Spacer, Progress, useTheme } from '@nextui-org/react'
import { RiPinDistanceFill, RiBarChartFill } from 'react-icons/ri'
import { colorByDifficulty } from '../helpers'
import { TrailType } from '../types'
import Tooltip from './Tooltip'

interface Props {
  trail: TrailType
}

interface Stat {
  name: string
  icon: JSX.Element
  children: React.ReactNode
}

const Stat = ({ name, icon, children }: Stat) => (
  <Text as="li">
    <Tooltip content={name}>{icon}</Tooltip>
    <Spacer x={4} y={0.15} />
    {children}
  </Text>
)

const Trail = ({ trail }: Props) => {
  const { theme } = useTheme()

  const { slug, geoJson, distance, elevation, rating } = trail
  // @ts-ignore
  const { name } = geoJson.features[0].properties

  return (
    <Link href={`/trails/${slug}`}>
      <Card
        bordered
        clickable
        hoverable
        css={{
          mt: '$10',
        }}
      >
        <Text h3>{name}</Text>
        <Spacer />
        <Grid.Container>
          <Grid xs={4} as="ul" alignItems="center">
            <Stat
              name="Lengd"
              icon={
                <RiPinDistanceFill
                  size={20}
                  color={theme?.colors.cyan600.value}
                />
              }
            >
              <Text as="strong">{`${Math.round(distance * 10) / 10} km`}</Text>
            </Stat>
            <Stat
              name="Hækkun"
              icon={
                <RiBarChartFill size={20} color={theme?.colors.cyan600.value} />
              }
            >
              <Text as="strong">{`${Math.round(elevation)} m`}</Text>
            </Stat>
            <Text as="li">
              <Tooltip content="Erfiðleikastig">
                <Text css={{ py: '$3' }} as="span">
                  <Progress
                    value={rating}
                    min={0}
                    max={5}
                    color="gradient"
                    size="xs"
                    css={{
                      width: '40px',
                      '> div': {
                        background: colorByDifficulty(rating),
                      },
                    }}
                  />
                </Text>
              </Tooltip>
            </Text>
          </Grid>
        </Grid.Container>
      </Card>
    </Link>
  )
}

export default Trail
