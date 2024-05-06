import * as React from 'react'
import PrintStationWidget from './PrintStationWidget'
import z from 'zod'
import {
  CustomDashboardWidgetProps,
  useDrop,
  useTagState,
} from '@jcoreio/clarity-feature-api/client'

const ConfigSchema = z.object({
  baseTag: z.string().optional(),
})
type Config = z.output<typeof ConfigSchema>

export type ConnectedPrintStationWidgetProps =
  CustomDashboardWidgetProps<Config>

export default function ConnectedPrintStationWidget({
  config,
  setConfig,
}: ConnectedPrintStationWidgetProps) {
  const parsed = ConfigSchema.safeParse(config)
  const baseTag = parsed.success ? parsed.data.baseTag : undefined

  const [, connectDropTarget] = useDrop({
    canDrop: ({ tag }) => tag !== null,
    drop: ({ tag }) => {
      if (tag != null) setConfig({ baseTag: tag })
      return undefined
    },
  })

  const subtag = (subtag: string) =>
    baseTag ? `${baseTag}/${subtag}` : undefined

  const tagStates = {
    base: useTagState(baseTag),
    printerStatus: useTagState(subtag('Printer Status')),
    cutterStatus: useTagState(subtag('Cutter Status')),
    completed: useTagState(subtag('Queue Completed')),
    total: useTagState(subtag('Queue Length')),
    cyanLevel: useTagState(subtag('Ink/C')),
    magentaLevel: useTagState(subtag('Ink/M')),
    yellowLevel: useTagState(subtag('Ink/Y')),
    blackLevel: useTagState(subtag('Ink/B')),
    whiteLevel: useTagState(subtag('Ink/W')),
  }

  const tagValue = (key: keyof typeof tagStates) => tagStates[key].data?.v
  const statusValue = (key: keyof typeof tagStates) => {
    const value = tagValue(key)
    return value === 'active' || value === 'idle' || value === 'error'
      ? value
      : undefined
  }
  const numberValue = (key: keyof typeof tagStates) => {
    const value = tagValue(key)
    return typeof value === 'number' ? value : undefined
  }
  const inkLevelValue = (
    key: 'cyan' | 'magenta' | 'yellow' | 'black' | 'white'
  ) => ({
    level: numberValue(`${key}Level`) ?? 0,
    max: tagStates[`${key}Level`].data?.Metadata?.max ?? 0,
    displayPrecision:
      tagStates[`${key}Level`].data?.Metadata?.displayPrecision ?? 0,
  })

  return (
    <PrintStationWidget
      loading={Object.values(tagStates).some((v) => v.loading)}
      error={Object.values(tagStates).find((v) => v.error)?.error}
      stationLabel={tagStates?.base?.data?.Metadata?.fullName?.join('/')}
      printerStatus={statusValue('printerStatus')}
      cutterStatus={statusValue('cutterStatus')}
      completed={numberValue('completed')}
      total={numberValue('total')}
      C={inkLevelValue('cyan')}
      M={inkLevelValue('magenta')}
      Y={inkLevelValue('yellow')}
      K={inkLevelValue('black')}
      W={inkLevelValue('white')}
      ref={connectDropTarget}
    />
  )
}
