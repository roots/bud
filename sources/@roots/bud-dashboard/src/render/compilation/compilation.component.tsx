import {relative} from 'node:path/posix'

import type {Context} from '@roots/bud-framework/options/context'
import {Box, Text} from '@roots/bud-support/ink'
import React from '@roots/bud-support/react'
import figures from 'figures'
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
const onlyStatic = ({info}: StatsAsset) => info.copied
const Compilation = ({
  displayAssets,
  displayEntrypoints,
  stats,
  id,
  context,
  mode,
  compilerCount,
}: {
  displayAssets: boolean
  displayEntrypoints: boolean
  stats: StatsCompilation
  id: number
  context: Context
  mode: `production` | `development`
  compilerCount: number
}) => {
  const enrich = (asset: Partial<StatsAsset>) => {
    const assetModule = stats?.assets?.find(a => a.name === asset.name)
    return {...asset, ...assetModule}
  }

  const entrypoints: StatsChunkGroup = stats?.entrypoints
    ? Object.values(stats?.entrypoints)
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
    <Box flexDirection="column">
      <Box flexDirection="row">
        <Text color={colorFromStats(stats)}>
          {stats?.errorsCount > 0 ? figures.cross : figures.circleFilled}
        </Text>

        <Text>{`  `}</Text>
        <Text>{stats.name}</Text>
        <Text> {``}</Text>

        {stats?.outputPath && (
          <Text color={color.blue}>
            ./{relative(context.basedir, stats.outputPath)}
          </Text>
        )}

        <Text>{` `}</Text>

        <Text dimColor>[{stats.hash}]</Text>
      </Box>

      {!stats.isChild && (
        <>
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
            {entrypoints.some(({assets}) => assets?.length > 0) ? (
              <Box flexDirection="column">
                <Title>
                  <Text
                    color={colorFromStats(stats)}
                    dimColor={displayEntrypoints === false}
                  >
                    <Text underline>e</Text>ntrypoints
                  </Text>
                </Title>
                {displayEntrypoints
                  ? entrypoints
                      .filter(({assets}) => assets.length > 0)
                      .map((chunk: StatsChunkGroup, id: number) => (
                        <Box key={id} flexDirection="column">
                          <ChunkGroup
                            indent={[true]}
                            {...chunk}
                            minWidth={longestEntrypointAssetLength}
                            final={id === entrypoints.length - 1}
                          />
                        </Box>
                      ))
                  : null}
                <Space>
                  <Text> </Text>
                </Space>
              </Box>
            ) : null}
          </Box>

          {staticAssets?.length > 0 ? (
            <Box flexDirection="column">
              <Title>
                <Text
                  color={colorFromStats(stats)}
                  dimColor={displayAssets === false}
                >
                  <Text underline>a</Text>ssets
                </Text>
              </Title>

              {displayAssets ? (
                <>
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
                </>
              ) : null}
            </Box>
          ) : null}

          <Space>
            <Text> </Text>
          </Space>
        </>
      )}

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
