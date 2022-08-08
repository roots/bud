/* eslint-disable no-console */
import type {Bud} from '@roots/bud-framework'
import chalk from 'chalk'
import figures from 'figures'
import {durationFormatter, sizeFormatter} from 'human-readable'
import {Box, render, Text} from 'ink'
import {relative} from 'node:path/posix'
import React from 'react'
import type {StatsChunkGroup, StatsCompilation} from 'webpack'
import {formatMessage} from 'webpack-format-messages'

import {Server} from './server.js'
import * as theme from './theme.js'

const VERT = figures.lineVertical
const SPACE = `\u{200A}`

const formatDuration = durationFormatter({
  allowMultiples: ['s', 'ms'],
})
const formatSize = sizeFormatter()

const Errors = ({errors}: {errors: StatsCompilation['errors']}) => {
  const formatted = errors
    ?.filter(str => !str.moduleIdentifier)
    ?.map(formatMessage)
    ?.map((message: string) =>
      message
        .replace('\t', '')
        .split('\n')
        .map(
          ln =>
            `${chalk.dim(VERT)}${SPACE}${ln.replace(process.cwd(), '.')}`,
        )
        .join('\n'),
    ) as Array<string>

  if (!formatted) return null

  return (
    <Box flexDirection="column">
      {formatted?.map((error: string, index) => (
        <Box key={index} flexDirection="column">
          <Box flexDirection="row">
            <Text dimColor>├─{SPACE}</Text>
            <Text color={theme.color.red}>{figures.cross} error</Text>
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
        .map(ln => `${chalk.dim(VERT)}  ${ln.replace(process.cwd(), '.')}`)
        .join('\n'),
    ) as Array<string>

  if (!formatted) return null

  return (
    <Box flexDirection="column">
      {formatted?.map((warning: string, index) => (
        <Box key={index} flexDirection="column">
          <Box flexDirection="row">
            <Text dimColor>├─{SPACE}</Text>
            <Text color={theme.color.yellow}>{figures.cross} warning</Text>
          </Box>

          <Box flexDirection="column">
            <Text>{warning.trim()}</Text>
          </Box>
        </Box>
      ))}
    </Box>
  )
}

const Asset = ({
  minWidth,
  name,
  size,
}: {
  minWidth: number
  name: string
  size?: number
}) => {
  return (
    <Box flexDirection="row">
      <Box>
        <Text dimColor>{SPACE}</Text>
      </Box>

      <Box minWidth={minWidth}>
        <Text dimColor>
          {name}
          {SPACE}
        </Text>
      </Box>

      {size && size > 0 && (
        <Box>
          <Text dimColor>{formatSize(size) as string}</Text>
        </Box>
      )}
    </Box>
  )
}

const Chunk = ({chunk}: {chunk: StatsChunkGroup}) => {
  const dynamicChunks = chunk.assets.filter(
    asset =>
      ['js', 'css'].includes(asset.name.split('.').pop()) &&
      !asset.name?.includes(`hot-update`),
  )

  const minWidth = dynamicChunks.reduce((longest, asset) => {
    return asset.name?.length > longest ? asset.name.length : longest
  }, 0)

  return (
    <Box flexDirection="column">
      {dynamicChunks?.map((asset, index) => (
        <Box key={index} flexDirection="row">
          <Text dimColor>
            {VERT}
            {SPACE}
            {SPACE}
            {index === dynamicChunks.length - 1 ? `└─` : '├─'}
          </Text>
          <Asset {...asset} minWidth={minWidth + 1} />
        </Box>
      ))}
    </Box>
  )
}

const Compilation = ({stats}: {stats: StatsCompilation}) => {
  if (!stats) return

  const namedChunks = Object.values(stats?.namedChunkGroups)
  const staticChunks = stats.assets.filter(
    asset =>
      ![`js`, `css`].includes(asset.name.split('.').pop()) &&
      !asset.name?.includes(`hot-update`),
  )
  const displayedStaticChunks = staticChunks.splice(0, 5)

  const minWidth = chunks =>
    chunks.reduce((longest, asset) => {
      return asset.name?.length > longest ? asset.name.length : longest
    }, 0) + 1

  return (
    <Box flexDirection="column" marginBottom={1}>
      <Errors errors={stats.errors} />
      <Warnings warnings={stats.warnings} />

      <Box flexDirection="column">
        {namedChunks.map((chunk, id) => {
          return (
            <Box key={id} flexDirection="column">
              <Box flexDirection="row">
                <Text dimColor>
                  {id === namedChunks.length - 1 ? `├─` : `└─`}
                  {SPACE}
                </Text>

                <Text
                  color={
                    stats?.errorsCount > 0
                      ? theme.color.dim
                      : theme.color.foregroundColor
                  }
                >
                  {chunk.name} ({formatSize(chunk.assetsSize) as string})
                </Text>
              </Box>

              <Chunk chunk={chunk} />
            </Box>
          )
        })}

        <Text dimColor>{VERT}</Text>

        <Box flexDirection="row">
          <Text dimColor>
            {`├─`}
            {SPACE}
          </Text>

          <Text
            color={
              stats?.errorsCount > 0
                ? theme.color.dim
                : theme.color.foregroundColor
            }
          >
            static
          </Text>
        </Box>

        {displayedStaticChunks?.map((asset, index) => {
          return (
            <Box key={index} flexDirection="column">
              <Box key={index} flexDirection="row">
                <Text dimColor>
                  {VERT}
                  {SPACE}
                  {SPACE}
                  {index !== displayedStaticChunks.length - 1
                    ? `├─`
                    : staticChunks?.length === 0
                    ? `└─`
                    : `├─`}
                </Text>

                <Asset
                  {...asset}
                  minWidth={minWidth(displayedStaticChunks)}
                />
              </Box>
            </Box>
          )
        })}
        {staticChunks.length > 0 && (
          <Box flexDirection="row">
            <Text dimColor>
              {VERT}
              {SPACE}
              {SPACE}
              {'└─'}
            </Text>
            <Text dimColor>
              {SPACE}
              {figures.ellipsis}
            </Text>
          </Box>
        )}
      </Box>

      <Box>
        <Text dimColor>│{SPACE}</Text>
      </Box>

      <Box flexDirection="row">
        <Box>
          <Text dimColor>└─{SPACE}</Text>
        </Box>

        <Text dimColor>
          compiled {stats?.modules?.length} modules in{' '}
          {formatDuration(stats?.time) as string}
        </Text>
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
  const color = (compilation: StatsCompilation) =>
    compilation?.errorsCount > 0
      ? theme.color.red
      : compilation?.warningsCount > 0
      ? theme.color.yellow
      : theme.color.green

  const emitCount = stats =>
    stats?.assets?.filter(asset => asset.emitted).length ?? 0

  render(
    <Box flexDirection="column" marginTop={1}>
      {stats?.children?.map((compilation, i) => (
        <Box key={i} flexDirection="column">
          <Box flexDirection="row">
            <Text color={color(compilation)}>
              {compilation?.errorsCount > 0
                ? figures.cross
                : figures.circleFilled}
            </Text>

            <Text color={color(compilation)}>
              {SPACE}./{relative(process.cwd(), compilation.outputPath)}
            </Text>

            <Text color={color(compilation)} dimColor>
              {SPACE}[{compilation.hash}]
            </Text>

            <Text color={color(compilation)} dimColor>
              {SPACE}[{i + 1}/{stats?.children.length}]
            </Text>
          </Box>

          <Text>{SPACE}</Text>
          <Text color={theme.color.cyan}>
            {figures.info} {emitCount(compilation)} assets emitted{' '}
          </Text>
          <Text dimColor>{figures.lineVerticalDashed7}</Text>

          <Compilation stats={compilation} />
        </Box>
      ))}

      {app.mode === 'development' && (
        <Box>
          <Server app={app} />
        </Box>
      )}
    </Box>,
  )
}
