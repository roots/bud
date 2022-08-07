/* eslint-disable no-console */
import type {Bud} from '@roots/bud-framework'
import chalk from 'chalk'
import figures from 'figures'
import {Box, render, Spacer, Text} from 'ink'
import Link from 'ink-link'
import {networkInterfaces} from 'node:os'
import React from 'react'
import type {StatsCompilation} from 'webpack'
import {formatMessage} from 'webpack-format-messages'

import * as formatAssets from './assets.js'
import {theme} from './theme.js'

const Errors = ({errors}: {errors: StatsCompilation['errors']}) => {
  const formatted = errors
    ?.filter(str => !str.moduleIdentifier)
    ?.map(formatMessage)
    ?.map((message: string) =>
      message
        .replace('\t', '')
        .split('\n')
        .map(ln => `${chalk.dim(`│`)}  ${ln.replace(process.cwd(), '.')}`)
        .join('\n'),
    ) as Array<string>

  if (!formatted) return null

  return (
    <Box flexDirection="column">
      {formatted?.map((error: string, index) => (
        <Box key={index} flexDirection="column">
          <Box flexDirection="row">
            <Text dimColor>├─ </Text>
            <Text color={theme.red}>{figures.cross} error</Text>
          </Box>

          <Box flexDirection="column">
            <Text>{error.trim()}</Text>
          </Box>
        </Box>
      ))}
    </Box>
  )
}

const Warnings = ({
  warnings,
}: {
  warnings: StatsCompilation['warnings']
}) => {
  const formatted = warnings
    ?.filter(str => !str.moduleIdentifier)
    ?.map(formatMessage)
    ?.map((message: string) =>
      message
        .replace('\t', '')
        .split('\n')
        .map(ln => `${chalk.dim(`│`)}  ${ln.replace(process.cwd(), '.')}`)
        .join('\n'),
    ) as Array<string>

  if (!formatted) return null

  return (
    <Box flexDirection="column">
      {formatted?.map((warning: string, index) => (
        <Box key={index} flexDirection="column">
          <Box flexDirection="row">
            <Text dimColor>├─ </Text>
            <Text color={theme.yellow}>{figures.cross} warning</Text>
          </Box>

          <Box flexDirection="column">
            <Text>{warning.trim()}</Text>
          </Box>
        </Box>
      ))}
    </Box>
  )
}

const Asset = ({status, minWidth, name, size, emitted}) => {
  return (
    <Box flexDirection="row">
      <Box marginRight={1}>
        <Text dimColor>├─</Text>
      </Box>

      <Box marginRight={1} minWidth={minWidth}>
        <Text color={emitted ? 'white' : 'dimColor'}>{name}</Text>
      </Box>

      <Box>
        <Text>{size}</Text>
      </Box>
    </Box>
  )
}

const Assets = ({compilation}: {compilation: StatsCompilation}) => {
  let assets = compilation.assets
    .filter(
      asset =>
        asset.name?.endsWith(`.css`) ||
        (asset.name?.endsWith(`.js`) &&
          !asset.name?.includes('hot-update')),
    )
    .filter(Boolean)
    .map(asset => ({
      ...asset,
      status: formatAssets.status(asset),
      name: asset.name,
      size: formatAssets.size(asset),
    }))

  const minWidth = assets.reduce((longest, asset) => {
    return asset.name?.length > longest ? asset.name.length : longest
  }, 0)

  return (
    <Box flexDirection="column">
      {assets.map((asset, index) => (
        <Asset key={index} {...asset} minWidth={minWidth} />
      ))}
    </Box>
  )
}

const Server = ({app}: {app: Bud}) => {
  const {protocol, port, hostname: internal} = app.server.connection.url

  const external = Object.values(networkInterfaces())
    .flat()
    .find(i => i?.family === 'IPv4' && !i?.internal)?.address

  const formatUrl = (host: string) => `${protocol}//${host}:${port}`

  return (
    <Box flexDirection="column">
      <Box flexDirection="row">
        <Box marginRight={1}>
          <Text dimColor>internal:</Text>
        </Box>
        <Box>
          {/* @ts-ignore */}
          <Link url={formatUrl(internal)}>
            <Text>{formatUrl(internal)}</Text>
          </Link>
        </Box>
      </Box>

      <Box flexDirection="row">
        <Box marginRight={1}>
          <Text dimColor>external:</Text>
        </Box>
        <Box>
          {/* @ts-ignore */}
          <Link url={formatUrl(external)}>
            <Text>{formatUrl(external)}</Text>
          </Link>
        </Box>
      </Box>

      <Box marginTop={1}>
        <Text>
          ...watching project sources
          {app.server.watcher?.files?.size && (
            <Text dimColor>
              {' '}
              (and {app.server.watcher.files.size} other{' '}
              {app.server.watcher.files.size > 1 ? 'files' : 'file'})
            </Text>
          )}
        </Text>
      </Box>
    </Box>
  )
}

const Name = ({
  name,
  color,
  hash,
}: {
  color: string
  figure: string
  name: string
  hash: string
}) => {
  const width = name.length + hash.length + 4

  return (
    <Box
      flexDirection="row"
      width={width}
      justifyContent="flex-start"
      marginBottom={1}
    >
      <Text color={color}>{name}</Text>
      <Spacer />
      <Text dimColor>({hash})</Text>
    </Box>
  )
}

const Compilation = ({
  stats,
  app,
}: {
  stats: StatsCompilation
  app: Bud
}) => {
  if (!stats) return

  return (
    <Box flexDirection="column" marginBottom={1}>
      <Name
        color={stats.errorsCount ? theme.red : theme.green}
        figure={stats?.errorsCount ? figures.cross : figures.tick}
        name={app.name}
        hash={stats.hash}
      />
      <Errors errors={stats.errors} />
      <Warnings warnings={stats.warnings} />
      {stats?.errorsCount === 0 && <Assets compilation={stats} />}
      <Box>
        <Text dimColor>│</Text>
      </Box>
      <Box flexDirection="row">
        <Box marginRight={1}>
          <Text dimColor>└─</Text>
        </Box>

        <Text dimColor>compiled in {formatAssets.time(stats?.time)}</Text>
      </Box>
    </Box>
  )
}

export const renderResults = ({
  stats,
  app,
}: {
  stats: StatsCompilation
  app: Bud
}) => {
  render(
    <Box flexDirection="column" marginTop={1}>
      {stats?.children?.map((compilation, i) => (
        <Compilation key={i} stats={compilation} app={app} />
      ))}

      {app.mode === 'development' && (
        <Box>
          <Server app={app} />
        </Box>
      )}
    </Box>,
  )
}
