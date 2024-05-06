import * as React from 'react'
import Box from '@material-ui/core/Box'
const defaultSize = 16
export type LightVariant = 'shining' | 'dimmed'

const rootStyle = {
  position: 'relative',
  display: 'inline-block',
  borderRadius: '100%',
  fontSize: defaultSize,
  width: '1em',
  height: '1em',
  boxShadow: 'inset 0px 0px 0em 0.1em currentColor',
} as const

export type Props = {
  size?: number | undefined
  color: string | undefined
  variant?: LightVariant | null | undefined
  className?: string
}
export default function LightWithStyles(props: Props): React.ReactElement {
  const { size, color, className, variant } = props

  return !color ? (
    <NALight className={className} size={size} />
  ) : (
    <Box
      data-component="Light"
      data-color={color}
      data-variant={variant}
      {...rootStyle}
      color={color}
      fontSize={size}
      className={className}
      {...(variant === 'shining'
        ? {
            boxShadow: 'none',
            style: {
              backgroundColor: 'currentColor',
            },
          }
        : {})}
    />
  )
}
type NALightProps = {
  className?: string
  size?: number | undefined
}
const HYP = Math.sqrt(2) * 6
function NALight(props: NALightProps): React.ReactElement {
  const { className, size } = props
  return (
    <svg
      {...props}
      data-component="Light"
      viewBox="0 0 24 24"
      className={className}
      style={{
        color: '#aaa',
        background: 'none',
        border: 'none',
        boxShadow: 'none',
        fontSize: size,
        userSelect: 'none',
        width: '1em',
        height: '1em',
        display: 'inline-block',
        fill: 'none',
        stroke: 'currentColor',
        strokeWidth: 2,
        flexShrink: 0,
      }}
    >
      <circle cx={12} cy={12} r={11} />
      <line x1={12 - HYP} y1={12 - HYP} x2={12 + HYP} y2={12 + HYP} />
      <line x1={12 - HYP} y1={12 + HYP} x2={12 + HYP} y2={12 - HYP} />
    </svg>
  )
}
