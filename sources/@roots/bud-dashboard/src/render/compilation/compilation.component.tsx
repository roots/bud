import figures from 'figures'
import {Box, Text} from 'ink'
import {relative} from 'node:path/posix'
import React from 'react'
import type {StatsCompilation} from 'webpack'

import Chunk from '../chunk/chunk.component.js'
import ChunkGroup from '../chunk/chunkgroup.component.js'
import Space from '../display/space.component.js'
import Title from '../display/title.component.js'
import {color, colorFromCompilation, duration, VERT} from '../format.js'
import Messages from '../messages/messages.component.js'

const Compilation = ({
  stats,
  id,
}: {
  stats: StatsCompilation
  id: number
}) => {
  if (!stats?.entrypoints) return null

  const enrich = (asset: any) => {
    const assetModule = stats?.assets?.find(a => a.name === asset.name)

    const {emitted, cached, type, info} = assetModule

    return {
      ...asset,
      emitted,
      cached,
      type,
      info,
    }
  }

  const entrypoints = Object.values(stats?.entrypoints).map(entrypoint => {
    entrypoint.assets = entrypoint.assets.map(enrich)
    return entrypoint
  })

  const staticAssets = stats?.assets
    ?.filter(asset => asset.emitted)
    ?.filter(
      asset =>
        ![`js`, `css`].includes(asset.name.split(`.`).pop()) &&
        !asset.name?.includes(`hot-update`),
    )
    .map(enrich)

  const hiddenStaticAssets = staticAssets.splice(5)

  const compilationColor = colorFromCompilation(stats)

  return (
    <Box flexDirection="column" marginBottom={1}>
      <Box flexDirection="row">
        <Text color={compilationColor}>
          {stats?.errorsCount > 0 ? figures.cross : figures.circleFilled}
        </Text>

        <Text>{` `}</Text>

        <Text color={compilationColor}>
          ./{relative(process.cwd(), stats.outputPath)}
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
          <Text color={compilationColor}>entrypoints</Text>
        </Title>

        {entrypoints.map((chunk, id) => (
          <Box key={id} flexDirection="column">
            <ChunkGroup
              indent={[true]}
              {...chunk}
              color={
                stats?.errorsCount > 0
                  ? color.red
                  : stats?.warningsCount > 0
                  ? color.yellow
                  : color.foregroundColor
              }
              final={id == entrypoints.length - 1}
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
            <Text color={compilationColor}>assets</Text>
          </Title>

          <Chunk assets={staticAssets} indent={[true]} />

          <Space>
            <Text> </Text>
          </Space>

          {hiddenStaticAssets?.length > 0 ? (
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
          ) : (
            <Space>
              <Text> </Text>
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
