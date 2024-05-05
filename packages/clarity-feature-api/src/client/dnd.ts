import { MetadataItem } from './TagState'
import {
  useDrop as baseUseDrop,
  DropTargetHookSpec,
  FactoryOrInstance,
  ConnectDropTarget,
} from 'react-dnd'
import { DND_ITEM } from './featureTestDnd'

export type ClarityDragObject = {
  tag?: string
  MetadataItem?: MetadataItem
}

export type ClarityDropResult = {
  dropAction?: 'move' | 'copy'
}

export type ClarityDropTargetHookSpec = {
  canDrop?: (item: ClarityDragObject) => boolean
  drop?: (item: ClarityDragObject) => ClarityDropResult | undefined
}

export type ClarityCollectedProps = {
  tag?: string
  MetadataItem?: MetadataItem
  canDrop: boolean
  isOver: boolean
}

export function useDrop(
  spec: FactoryOrInstance<ClarityDropTargetHookSpec>,
  deps?: unknown[]
): [ClarityCollectedProps, ConnectDropTarget] {
  return baseUseDrop(
    typeof spec === 'function' ? () => wrapSpec(spec()) : wrapSpec(spec),
    deps
  )
}

function wrapSpec(
  spec: ClarityDropTargetHookSpec
): DropTargetHookSpec<
  ClarityDragObject,
  ClarityDropResult,
  ClarityCollectedProps
> {
  return {
    accept: DND_ITEM,
    canDrop: (item) => {
      return spec.canDrop?.(item) ?? true
    },
    collect: (monitor) => ({
      tag: (monitor.getItem() as ClarityDragObject | undefined)?.tag,
      MetadataItem: (monitor.getItem() as ClarityDragObject | undefined)
        ?.MetadataItem,
      canDrop: monitor.canDrop(),
      isOver: monitor.isOver(),
    }),
  }
}
