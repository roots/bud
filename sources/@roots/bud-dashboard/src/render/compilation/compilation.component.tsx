import figures from 'figures'
import {Box, Text} from 'ink'
import {relative} from 'node:path/posix'
import React from 'react'
import type {StatsCompilation} from 'webpack'

import Chunk from '../chunk/chunk.component.js'
import ChunkGroup from '../chunk/chunkgroup.component.js'
import Space from '../display/space.component.js'
import Title from '../display/title.component.js'
import {color, colorFromCompilation, duration, SPACE} from '../format.js'
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
    ?.filter(
      asset =>
        ![`js`, `css`].includes(asset.name.split('.').pop()) &&
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

        <Text color={compilationColor}>
          {SPACE}
          {SPACE}./
          {relative(process.cwd(), stats.outputPath)}
        </Text>

        <Text dimColor>
          {SPACE}[{stats.hash}]
        </Text>
      </Box>

      <Text dimColor>{figures.lineVerticalDashed7}</Text>

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
              assets={chunk.assets}
              name={chunk.name}
              indent={[true]}
              emitted={chunk.emitted && stats?.errorsCount === 0}
              color={
                stats?.errorsCount > 0 ? color.dim : color.foregroundColor
              }
              final={id == entrypoints.length - 1}
            />
          </Box>
        ))}

        <Space>
          <Text> </Text>
        </Space>
      </Box>

      <Box flexDirection="column">
        <Title>
          <Text color={compilationColor}>assets</Text>
        </Title>

        <Chunk
          assets={staticAssets}
          emitted={stats?.errorsCount === 0}
          indent={[true]}
        />

        <Space>
          <Text> </Text>
        </Space>

        {hiddenStaticAssets?.length > 0 ? (
          <Space>
            <Text dimColor>
              {SPACE}
              {figures.ellipsis}
              {SPACE}
              {hiddenStaticAssets.length}
              {SPACE}additional assets not shown
            </Text>
          </Space>
        ) : null}
      </Box>

      <Space>
        <Text> </Text>
      </Space>

      <Title final={true}>
        <Text dimColor>
          compiled {stats?.modules?.length} modules in{' '}
          {duration(stats?.time) as string}
        </Text>
      </Title>
    </Box>
  )
}

export default Compilation
