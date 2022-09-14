import {useInput} from '@roots/bud-support/ink'
import React, {useState} from '@roots/bud-support/react'

export const useTTY = () => {
  const [displayServerInfo, setDisplayServerInfo] = useState(true)
  const [displayEntrypoints, setDisplayEntrypoints] = useState(true)
  const [displayAssets, setDisplayAssets] = useState(false)

  useInput(key => {
    key === `s` && setDisplayServerInfo(!displayServerInfo)
    key === `e` && setDisplayEntrypoints(!displayEntrypoints)
    key === `a` && setDisplayAssets(!displayAssets)
  })

  return {displayAssets, displayEntrypoints, displayServerInfo}
}

export const TTYApp = ({App, ...props}: any) => {
  const {displayAssets, displayEntrypoints, displayServerInfo} = useTTY()

  return (
    <App
      {...props}
      isTTY={true}
      displayAssets={displayAssets}
      displayEntrypoints={displayEntrypoints}
      displayServerInfo={displayServerInfo}
    />
  )
}
