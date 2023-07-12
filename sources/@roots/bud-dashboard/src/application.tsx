import type {Bud} from '@roots/bud-framework'
import type {StatsCompilation} from '@roots/bud-framework/config'
import type {BudErrorClass} from '@roots/bud-support/errors'

import {exit} from 'node:process'

import Compilation from '@roots/bud-dashboard/views/compilation'
import Debug from '@roots/bud-dashboard/views/debug'
import Error from '@roots/bud-dashboard/views/node-error'
import Server from '@roots/bud-dashboard/views/server'
import {
  Box,
  type PropsWithChildren,
  useApp,
  useInput,
  useState,
} from '@roots/bud-support/ink'

export interface Props {
  basedir?: string
  close?: (callback: (error?: Error | null) => any) => void
  closed?: boolean
  compact?: boolean
  compilations?: Array<Partial<StatsCompilation>>
  debug?: boolean
  devUrl?: URL
  displayAssets?: boolean
  displayEntrypoints?: boolean
  displayServerInfo?: boolean
  error?: BudErrorClass
  errors?: StatsCompilation[`errors`]
  isolated?: number
  mode: Bud['mode']
  proxy?: boolean
  proxyUrl?: URL
  publicDevUrl?: URL
  publicProxyUrl?: URL
  status?: false | string
  warnings?: StatsCompilation[`warnings`]
}

export const Application = ({
  basedir,
  compact,
  compilations,
  debug,
  devUrl,
  displayAssets,
  displayEntrypoints,
  displayServerInfo,
  error,
  isolated = 0,
  mode,
  proxy,
  proxyUrl,
  publicDevUrl,
  publicProxyUrl,
  status,
}: Props) => {
  if (error) return <Error error={error} />

  if (!compilations || !Array.isArray(compilations)) return null

  return (
    <Box flexDirection="column" gap={1} marginY={1}>
      {compilations?.map((compilation, id) => {
        if (!compilation?.hash) return null

        if (isolated > 0 && id + 1 !== isolated) return null

        return (
          <Box flexDirection="column" gap={1} key={id}>
            <Compilation
              basedir={basedir}
              compact={compact}
              compilation={compilation}
              debug={debug}
              displayAssets={displayAssets}
              displayEntrypoints={displayEntrypoints}
              id={id + 1}
              total={compilations.length}
            />
            <Debug compilation={compilation} debug={debug} />
          </Box>
        )
      })}

      <Server
        devUrl={devUrl}
        displayServerInfo={displayServerInfo}
        mode={mode}
        proxy={proxy}
        proxyUrl={proxyUrl}
        publicDevUrl={publicDevUrl}
        publicProxyUrl={publicProxyUrl}
      />
    </Box>
  )
}

/* c8 ignore next 71 */
export const TeletypeApplication = ({
  children,
  close,
  ...props
}: PropsWithChildren<Props>) => {
  const app = useApp()

  const [displayServerInfo, setDisplayServerInfo] = useState(
    props.displayServerInfo,
  )
  const [debug, setDisplayDebug] = useState(props.debug)
  const [displayEntrypoints, setDisplayEntrypoints] = useState(true)
  const [displayAssets, setDisplayAssets] = useState(props.displayAssets)
  const [closed, setClosed] = useState(false)
  const [compact, setCompact] = useState(props.compact)
  const [isolated, setIsolated] = useState(0)

  useInput((key, input) => {
    switch (key) {
      case `a`:
        setDisplayAssets(!displayAssets)
        break
      case `e`:
        setDisplayEntrypoints(!displayEntrypoints)
        break
      case `d`:
        setDisplayDebug(!debug)
        break
      case `s`:
        setDisplayServerInfo(!displayServerInfo)
        break
      case `c`:
        setCompact(!compact)
        break
      case `0`:
        setIsolated(0)
        break
      default:
        break
    }

    new Array(9)
      .fill(0)
      .forEach(
        (_, i) =>
          key === `${i + 1}` &&
          isolated !== i + 1 &&
          setIsolated(Math.min(i + 1, props.compilations.length)),
      )

    if (input.escape) {
      setClosed(true)
      close((error?) => {
        app.exit(error)
        exit(error ? 1 : 0)
      })
    }
  })

  return (
    <Application
      {...props}
      closed={closed}
      compact={compact}
      debug={debug}
      displayAssets={displayAssets}
      displayEntrypoints={displayEntrypoints}
      displayServerInfo={displayServerInfo}
      isolated={isolated}
    />
  )
}
