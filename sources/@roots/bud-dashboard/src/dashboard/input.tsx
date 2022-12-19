import {useApp, useInput} from '@roots/bud-support/ink'
import React, {useState} from '@roots/bud-support/react'

import {App, Props} from './index.js'

export const TTYApp = (props: Props) => {
  const [displayServerInfo, setDisplayServerInfo] = useState(true)
  const [displayEntrypoints, setDisplayEntrypoints] = useState(true)
  const [displayAssets, setDisplayAssets] = useState(false)
  const app = useApp()

  useInput((key, input) => {
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
