import * as React from 'react'
import Box from '@material-ui/core/Box'
import InkLevelsWidget from './InkLevelsWidget'
import Typography from '@material-ui/core/Typography'
import Light from './Light'
import z from 'zod'
import upperFirst from './upperFirst'

const InkLevelSchema = z.object({
  level: z.number(),
  max: z.number(),
  displayPrecision: z.number().int().min(0).max(8).optional(),
})

export const PrintStationWidgetPropsSchema = z
  .object({
    loading: z.boolean().optional(),
    error: z.instanceof(Error).optional(),
    stationLabel: z.string(),
    printerStatus: z.enum(['active', 'idle', 'error']),
    cutterStatus: z.enum(['active', 'idle', 'error']),
    completed: z.number(),
    total: z.number(),
    C: InkLevelSchema,
    M: InkLevelSchema,
    Y: InkLevelSchema,
    K: InkLevelSchema,
    W: InkLevelSchema,
  })
  .partial()

export type PrintStationWidgetProps = z.output<
  typeof PrintStationWidgetPropsSchema
>

export default React.forwardRef(function PrintStationWidget(
  {
    loading,
    error,
    stationLabel,
    printerStatus,
    cutterStatus,
    completed,
    total,
    C,
    M,
    Y,
    K,
    W,
  }: PrintStationWidgetProps,
  ref: React.ForwardedRef<HTMLDivElement>
) {
  return (
    <Box
      display="flex"
      alignItems="stretch"
      // @ts-expect-error no prop type...
      ref={ref}
    >
      <Box
        flexBasis="33%"
        display="flex"
        flexDirection="column"
        alignItems="stretch"
        position="relative"
      >
        <Box m={2} mt={1} mb={1} position="absolute" top={0} width="100%">
          <Typography
            variant="h5"
            style={{ fontSize: '1.5em', fontWeight: 500 }}
          >
            {stationLabel}
          </Typography>
        </Box>
        <Box flexBasis="0px" flexGrow={1} display="flex" alignItems="stretch">
          <Section title="Printer Status" flexBasis="50%">
            <Box m={2} mt={1} display="flex" alignItems="center">
              <Light
                size={30}
                color={
                  printerStatus === 'active'
                    ? 'green'
                    : printerStatus === 'idle'
                    ? '#ddd'
                    : printerStatus === 'error'
                    ? 'red'
                    : undefined
                }
                variant={printerStatus ? 'shining' : 'dimmed'}
              />
              <Box ml={1}>
                <Typography variant="h6" style={{ fontWeight: 500 }}>
                  {printerStatus ? upperFirst(printerStatus) : undefined}
                </Typography>
              </Box>
            </Box>
          </Section>
          <Section title="Cutter Status" flexBasis="50%">
            <Box m={2} mt={1} display="flex" alignItems="center">
              <Light
                size={30}
                color={
                  cutterStatus === 'active'
                    ? 'green'
                    : cutterStatus === 'idle'
                    ? '#ddd'
                    : cutterStatus === 'error'
                    ? 'red'
                    : undefined
                }
                variant={cutterStatus ? 'shining' : 'dimmed'}
              />
              <Box ml={1}>
                <Typography variant="h6" style={{ fontWeight: 500 }}>
                  {cutterStatus ? upperFirst(cutterStatus) : undefined}
                </Typography>
              </Box>
            </Box>
          </Section>
        </Box>
      </Box>
      <Box width={0} borderLeft="1px solid #ddd" mt={7} mb={2} />
      <Section title="Production Queue">
        <Box flexGrow={1} />
        <Box textAlign="center" fontSize="150%">
          {Number.isFinite(completed) && Number.isFinite(total) ? (
            <>
              {completed} of {total}
            </>
          ) : null}
        </Box>
        <Box
          flexBasis="1em"
          maxHeight="2em"
          flexGrow={1}
          flexShrink={1}
          bgcolor="#eee"
          m={2}
          position="relative"
        >
          <Box
            position="absolute"
            bgcolor="green"
            height="100%"
            left={0}
            width={`${
              completed != null &&
              total != null &&
              total !== 0 &&
              Number.isFinite(completed) &&
              Number.isFinite(total)
                ? (completed / total) * 100
                : 0
            }%`}
          />
        </Box>
      </Section>
      <Box width={0} borderLeft="1px solid #ddd" mt={7} mb={2} />
      <Section title="Supplies">
        <InkLevelsWidget flexGrow={1} {...{ C, M, Y, K, W }} />
      </Section>
    </Box>
  )
})

type SectionProps = React.ComponentProps<typeof Box> & {
  title: React.ReactNode
  titleStyle?: {}
}

function Section({ title, children, titleStyle, ...props }: SectionProps) {
  return (
    <Box
      flexBasis="0px"
      flexGrow={1}
      display="flex"
      flexDirection="column"
      alignItems="stretch"
      pt={5}
      {...props}
    >
      <Box m={2} mt={1} mb={1}>
        <Typography variant="h6" style={{ fontWeight: 400, ...titleStyle }}>
          {title}
        </Typography>
      </Box>
      {children}
    </Box>
  )
}
