import figures from 'figures'
import {Box, Text} from 'ink'
import {relative} from 'node:path/posix'
import React from 'react'
import type {StatsCompilation} from 'webpack'

import Chunk from '../chunk/chunk.component.js'
import ChunkGroup from '../chunk/chunkgroup.component.js'
import Space from '../display/space.component.js'
import Title from '../display/title.component.js'
import {
  color,
  colorFromCompilation,
  duration,
  SPACE,
  VERT,
} from '../format.js'
import Messages from '../messages/messages.component.js'

const Compilation = ({
  stats,
  id,
}: {
  stats: StatsCompilation
  id: number
}) => {
  if (!stats) return

  const namedChunks = Object.values(stats?.namedChunkGroups)

  const staticAssets = stats?.assets?.filter(
    asset =>
      ![`js`, `css`].includes(asset.name.split('.').pop()) &&
      !asset.name?.includes(`hot-update`),
  )

  const hiddenStaticAssets = staticAssets.splice(5)

  const statusColor =
    stats?.errorsCount > 0 ? color.red : color.foregroundColor

  const compilationColor = colorFromCompilation(stats)

  return (
    <Box flexDirection="column" marginBottom={1}>
      <Box flexDirection="row">
        <Text color={compilationColor}>
          {stats?.errorsCount > 0 ? figures.cross : figures.circleFilled}
        </Text>

        <Text color={compilationColor}>
          {SPACE}./
          {relative(process.cwd(), stats.outputPath)}
        </Text>

        <Text color={compilationColor} dimColor>
          {SPACE}[{stats.hash}]
        </Text>

        <Text color={compilationColor} dimColor>
          {SPACE}[{id + 1}/{stats?.children.length}]
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
          <Text color={statusColor}>chunks</Text>
        </Title>

        {namedChunks.map((chunk, id) => (
          <Box key={id} flexDirection="column">
            <ChunkGroup
              emitted={chunk.emitted}
              assetsSize={chunk.assetsSize}
              assets={chunk.assets}
              name={chunk.name}
              indent={[true]}
              color={statusColor}
              final={id == namedChunks.length - 1}
            />
          </Box>
        ))}

        <Space>
          <Text> </Text>
        </Space>
      </Box>

      <Box flexDirection="column">
        <Title>
          <Text color={statusColor}>statics</Text>
        </Title>

        <Chunk assets={staticAssets} indent={[true]} />

        {hiddenStaticAssets.length > 0 && (
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
              {SPACE}
              {hiddenStaticAssets.length}
              {SPACE}additional assets
            </Text>
          </Box>
        )}
      </Box>

      <Space>
        <Text> </Text>
      </Space>

      <Title final={true}>
        <Text color={statusColor} dimColor>
          compiled {stats?.modules?.length} modules in{' '}
          {duration(stats?.time) as string}
        </Text>
      </Title>
    </Box>
  )
}

export default Compilation
