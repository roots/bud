import type {Context} from '@roots/bud-framework/src/config/context.js'
import figures from 'figures'
import {Box, Text} from 'ink'
import {relative} from 'node:path/posix'
import React from 'react'
import type {StatsAsset, StatsChunkGroup, StatsCompilation} from 'webpack'

import Chunk from '../chunk/chunk.component.js'
import ChunkGroup from '../chunk/chunkgroup.component.js'
import Space from '../display/space.component.js'
import Title from '../display/title.component.js'
import {
  color,
  colorFromStats,
  duration,
  longestAssetNameLength,
  VERT,
} from '../format.js'
import Messages from '../messages/messages.component.js'

const onlyNotHot = ({name}: StatsAsset) => !name?.includes(`hot-update`)
const onlyStatic = ({name}: StatsAsset) =>
  ![`js`, `css`].some(ext => name.endsWith(ext))

const Compilation = ({
  stats,
  id,
  context,
}: {
  stats: StatsCompilation
  id: number
  context: Context
}) => {
  if (!stats?.entrypoints) return null

  const enrich = (asset: StatsAsset) => {
    const assetModule = stats?.assets?.find(a => a.name === asset.name)
    const {emitted, cached, type, info} = assetModule
    return {...asset, emitted, cached, type, info}
  }

  const entrypoints: StatsChunkGroup = stats?.entrypoints
    ? Object.values(stats?.entrypoints)
        .filter(onlyNotHot)
        .filter(Boolean)
        .map(entrypoint => ({
          ...entrypoint,
          assets: entrypoint.assets.map(enrich),
        }))
    : []

  const longestEntrypointAssetLength: number = entrypoints.reduce(
    (longest, entry) =>
      Math.max(longestAssetNameLength(entry.assets), longest),
    0,
  )

  const staticAssets: Array<StatsAsset> = (stats?.assets ?? [])
    .filter(onlyNotHot)
    .filter(onlyStatic)
    .filter(Boolean)
    .map(enrich)

  const hiddenStaticAssets: Array<StatsAsset> = staticAssets.splice(5)

  return (
    <Box flexDirection="column" marginBottom={1}>
      <Box flexDirection="row">
        <Text color={colorFromStats(stats)}>
          {stats?.errorsCount > 0 ? figures.cross : figures.circleFilled}
        </Text>

        <Text>{` `}</Text>

        <Text color={colorFromStats(stats)}>
          ./{relative(context.basedir, stats.outputPath)}
        </Text>

        <Text>{` `}</Text>

        <Text dimColor>[{stats.hash}]</Text>
      </Box>

      <Text dimColor>{VERT}</Text>

      <Messages
        type="error"
        color={color.red}
        messages={stats.errors}
        figure={figures.cross}
      />

      <Messages
        type="warning"
        color={color.yellow}
        messages={stats.warnings}
        figure={figures.warning}
      />

      <Box flexDirection="column">
        <Title>
          <Text color={colorFromStats(stats)}>entrypoints</Text>
        </Title>

        {entrypoints.map((chunk: StatsChunkGroup, id: number) => (
          <Box key={id} flexDirection="column">
            <ChunkGroup
              indent={[true]}
              {...chunk}
              color={colorFromStats(chunk.assets)}
              minWidth={longestEntrypointAssetLength}
              final={id === entrypoints.length - 1}
            />
          </Box>
        ))}

        <Space>
          <Text> </Text>
        </Space>
      </Box>

      {staticAssets.length > 0 ? (
        <Box flexDirection="column">
          <Title>
            <Text color={colorFromStats(stats)}>assets</Text>
          </Title>

          <Chunk assets={staticAssets} indent={[true]} />

          <Space>
            <Text> </Text>
          </Space>

          {hiddenStaticAssets?.length > 0 && (
            <Space>
              <Text dimColor>
                {` `}
                {figures.ellipsis}
                {` `}
                {hiddenStaticAssets.length}
                {` `}
                additional asset(s) not shown
              </Text>
            </Space>
          )}
        </Box>
      ) : null}

      <Space>
        <Text> </Text>
      </Space>

      <Title final={true}>
        <Text dimColor>
          compiled {stats?.modules?.length} modules in{` `}
          {duration(stats?.time) as string}
        </Text>
      </Title>
    </Box>
  )
}

export default Compilation
