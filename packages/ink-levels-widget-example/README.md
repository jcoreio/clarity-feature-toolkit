This is a [Clarity](https://www.jcore.io/clarity) custom feature project bootstrapped with [`create-clarity-feature`](https://github.com/jcoreio/clarity-feature-toolkit/tree/master/packages/create-clarity-feature).

## Getting Started

At the moment, the only contribution point your feature can make is a custom dashboard widget.
There will be more contribution points and `clarity-feature-toolkit` helper commands to create them soon,
but for now, declare the custom dashboard widget in `package.json`:

```json
{
  "name": "my-feature",
  "version": "1.0.0",
  "contributes": {
    "client": {
      "dashboardWidgets": {
        "My": {
          "displayName": "My Widget",
          "component": "./MyWidget.tsx"
        }
      }
    }
  },
}
```

Then create the custom widget file:

```tsx
import * as React from 'react'
import {
  useTagState,
  useDrop,
  CustomDashboardWidgetProps,
} from '@jcoreio/clarity-feature-api/client'

type MyWidgetConfig = {
  tag?: string
}

export type MyWidgetProps = CustomDashboardWidgetProps<
  MyWidgetConfig | undefined
>

export default function MyWidget({
  config,
  setConfig,
}: MyWidgetProps) {
  const tag = config?.tag
  const tagState = useTagState(tag)
  const [, connectDropTarget] = useDrop({
    canDrop: ({ tag }) => tag != null,
    drop: ({ tag }) => {
      if (tag) setConfig({ tag })
      return undefined
    },
  })
  return (
    <div ref={connectDropTarget}>
      <h1>My Widget</h1>
      <pre>{JSON.stringify(config, null, 2)}</pre>
      <pre>{JSON.stringify(tagState, null, 2)}</pre>
    </div>
  )
}
```

## Deploying

Run `npm run deploy`, and `clarity-feature-toolkit` will run through the process of deploying to
Clarity in an interactive CLI.
