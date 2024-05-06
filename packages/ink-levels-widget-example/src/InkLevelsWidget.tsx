import Box from '@material-ui/core/Box'
import * as React from 'react'

type InkLevel = { level: number; max: number; displayPrecision?: number }

export type InkLevelsWidgetProps = React.ComponentProps<typeof Box> & {
  C?: InkLevel
  M?: InkLevel
  Y?: InkLevel
  K?: InkLevel
  W?: InkLevel
}

export default function InkLevelsWidget({
  C,
  M,
  Y,
  K,
  W,
  ...props
}: InkLevelsWidgetProps) {
  return (
    <Box
      display="flex"
      flexWrap="nowrap"
      flexDirection="column"
      alignItems="stretch"
      {...props}
    >
      <Box
        display="flex"
        flexWrap="nowrap"
        alignContent="center"
        justifyContent="center"
        alignItems="stretch"
        flexGrow={1}
        p={2}
        pt={0.5}
      >
        {(
          [
            [C, 'cyan', 'C'],
            [M, 'magenta', 'M'],
            [Y, 'yellow', 'Y'],
            [K, 'black', 'K'],
            [W, '#bbb', 'W'],
          ] as const
        ).map(([ink, color, initial]) => (
          <Box
            key={color}
            flexBasis="20%"
            flexGrow={0}
            flexShrink={0}
            display="flex"
          >
            <Box
              flexGrow={1}
              flexShrink={1}
              overflow="hidden"
              display="flex"
              flexDirection="column"
              justifyContent="space-between"
              alignItems="flex-end"
              pl={1}
              pr={1}
            >
              <div>{initial}</div>
              <div>
                {ink &&
                ink.max !== 0 &&
                Number.isFinite(ink.level) &&
                Number.isFinite(ink.max)
                  ? ink.level.toFixed(
                      Number.isFinite(ink.displayPrecision)
                        ? ink.displayPrecision
                        : 0
                    )
                  : null}
              </div>
            </Box>
            <Box
              flexBasis="30%"
              flexGrow={0}
              flexShrink={0}
              display="flex"
              flexDirection="column"
              alignItems="stretch"
            >
              <Box
                flexGrow={1}
                flexShrink={1}
                bgcolor="#eee"
                position="relative"
                border={
                  (color as string) === 'white' ? '#eee 2px solid' : undefined
                }
              >
                <Box
                  position="absolute"
                  bottom={0}
                  left={0}
                  right={0}
                  height={`${
                    ink &&
                    ink.max !== 0 &&
                    Number.isFinite(ink.level) &&
                    Number.isFinite(ink.max)
                      ? (ink.level / ink.max) * 100
                      : 0
                  }%`}
                  bgcolor={color}
                />
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  )
}
