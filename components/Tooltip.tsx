import { Tooltip, theme } from '@nextui-org/react'

interface Props {
  content: string
  children: React.ReactNode
}

const TooltipComponent = ({ content, children }: Props) => (
  <Tooltip content={content} color="invert" css={{ color: '$background' }}>
    {children}
  </Tooltip>
)

export default TooltipComponent
