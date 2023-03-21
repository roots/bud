import * as Ink from 'ink'
import React from 'react'

import {App, Props} from './index.js'

export const TTYApp = (props: Props) => {
  const [displayServerInfo, setDisplayServerInfo] = React.useState(true)
  const [displayEntrypoints, setDisplayEntrypoints] = React.useState(true)
  const [displayAssets, setDisplayAssets] = React.useState(true)
  const app = Ink.useApp()

  Ink.useInput((key, input) => {
    key === `s` && setDisplayServerInfo(!displayServerInfo)
    key === `e` && setDisplayEntrypoints(!displayEntrypoints)
    key === `a` && setDisplayAssets(!displayAssets)

    if (input.escape) {
      app.exit()
      // eslint-disable-next-line n/no-process-exit
      process.exit(0)
    }
  })

  return (
    <App
      {...{
        ...props,
        displayServerInfo,
        displayEntrypoints,
        displayAssets,
      }}
    />
  )
}
