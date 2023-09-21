import type {Bud} from '@roots/bud-framework'
import type {StatsCompilation} from '@roots/bud-framework/config'

import {exit} from 'node:process'

import {Error} from '@roots/bud-dashboard/components/error'
import Compilation from '@roots/bud-dashboard/views/compilation'
import Debug from '@roots/bud-dashboard/views/debug'
import Server from '@roots/bud-dashboard/views/server'
import {
  Box,
  type PropsWithChildren,
  Static,
  useApp,
  useInput,
  useState,
  useStdout,
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
  error?: Error
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
  const {stdout} = useStdout()

  compilations = Array.isArray(compilations)
    ? compilations?.filter(compilation => compilation.hash) ?? []
    : []

  if (mode === `production`) {
    return (
      <Box flexDirection="column" gap={1}>
        {error && <Error error={error} />}

        <Static items={compilations}>
          {(compilation, id) => {
            if (isolated > 0 && id + 1 !== isolated) return null

            return (
              <RenderCompilation
                basedir={basedir}
                compact={compact}
                compilation={compilation}
                compilations={compilations}
                debug={debug}
                displayAssets={displayAssets}
                displayEntrypoints={displayEntrypoints}
                id={id}
                key={`${compilation.name}-${compilation.hash}-${id}`}
                stdout={stdout}
              />
            )
          }}
        </Static>
      </Box>
    )
  }

  return (
    <>
      {error && <Error error={error} />}
      {compilations.map((compilation, id) => (
        <RenderCompilation
          basedir={basedir}
          compact={compact}
          compilation={compilation}
          compilations={compilations}
          debug={debug}
          displayAssets={displayAssets}
          displayEntrypoints={displayEntrypoints}
          id={id}
          key={`${compilation.name}-${compilation.hash}-${id}`}
          stdout={stdout}
        />
      ))}

      <Server
        devUrl={devUrl}
        displayServerInfo={displayServerInfo}
        mode={mode}
        proxy={proxy}
        proxyUrl={proxyUrl}
        publicDevUrl={publicDevUrl}
        publicProxyUrl={publicProxyUrl}
      />
    </>
  )
}

export const RenderCompilation = ({
  basedir,
  compact,
  compilation,
  compilations,
  debug,
  displayAssets,
  displayEntrypoints,
  id,
  stdout,
}: {
  basedir?: string
  compact?: boolean
  compilation: Partial<StatsCompilation>
  compilations?: Array<Partial<StatsCompilation>>
  debug?: boolean
  displayAssets?: boolean
  displayEntrypoints?: boolean
  id: number
  stdout: NodeJS.WriteStream
}) => {
  return (
    <Box flexDirection="column" gap={1} width={stdout.columns - 2}>
      <Compilation
        basedir={basedir}
        compact={compact}
        compilation={compilation}
        debug={debug}
        displayAssets={displayAssets}
        displayEntrypoints={displayEntrypoints}
        id={id + 1}
        total={compilations?.length}
      />
      <Debug compilation={compilation} debug={debug} />
    </Box>
  )
}

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

    new Array(9).fill(0).forEach((_, i) => {
      if (!props.compilations) return
      key === `${i + 1}` &&
        isolated !== i + 1 &&
        setIsolated(Math.min(i + 1, props.compilations.length))
    })

    if (input.escape) {
      setClosed(true)
      if (close)
        close((error?) => {
          if (error) app.exit(error)
          else app.exit()

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
