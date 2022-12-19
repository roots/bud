import {relative} from 'node:path/posix'

import type {Context} from '@roots/bud-framework/options/context'
import {Box, Text} from '@roots/bud-support/ink'
import React from '@roots/bud-support/react'
import type {
  StatsAsset,
  StatsChunkGroup,
  StatsCompilation,
} from '@roots/bud-support/webpack'
import figures from 'figures'

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

interface Props {
  displayAssets: boolean
  displayEntrypoints: boolean
  compilation: StatsCompilation
  id: number
  context: Context
  mode: `production` | `development`
  compilerCount: number
}

const onlyNotHot = ({name}: StatsAsset) => !name?.includes(`hot-update`)
const onlyStatic = ({info}: StatsAsset) => info?.copied
const Compilation = ({
  displayAssets,
  displayEntrypoints,
  compilation,
  id,
  context,
  mode,
  compilerCount,
}: Props) => {
  const enrich = (asset: Partial<StatsAsset>): Partial<StatsAsset> => {
    const assetModule = compilation?.assets?.find(
      a => a?.name === asset?.name,
    )
    return {...(asset ?? {}), ...(assetModule ?? {})}
  }

  const entrypoints: StatsChunkGroup = compilation?.entrypoints
    ? Object.values(compilation?.entrypoints)
        .filter(Boolean)
        .map(entrypoint => ({
          ...entrypoint,
          assets: entrypoint.assets.map(enrich),
        }))
    : []

  const longestEntrypointAssetLength: number = entrypoints.reduce(
    (longest: number, entry) =>
      Math.max(longestAssetNameLength(entry.assets), longest),
    0,
  )

  const staticAssets: Array<Partial<StatsAsset>> = (
    compilation?.assets ?? []
  )
    .filter(onlyNotHot)
    .filter(onlyStatic)
    .filter(Boolean)
    .map(enrich)

  const hiddenStaticAssets: Array<Partial<StatsAsset>> =
    staticAssets.splice(5)

  if (!compilation) {
    return <Text>Empty compilation</Text>
  }

  return (
    <Box flexDirection="column">
      <Box flexDirection="row">
        <Text color={colorFromStats(compilation)}>
          {compilation?.errorsCount > 0
            ? figures.cross
            : figures.circleFilled}
        </Text>

        <Text>{`  `}</Text>
        <Text>{compilation?.name}</Text>
        <Text> {``}</Text>

        {compilation?.outputPath && (
          <Text color={color.blue}>
            ./{relative(context.basedir, compilation.outputPath)}
          </Text>
        )}

        <Text>{` `}</Text>

        <Text dimColor>[{compilation?.hash}]</Text>
      </Box>

      {!compilation?.isChild && (
        <>
          <Text dimColor>{VERT}</Text>

          <Messages
            type="error"
            color={color.red}
            messages={compilation.errors}
            figure={figures.cross}
          />

          <Messages
            type="warning"
            color={color.yellow}
            messages={compilation.warnings}
            figure={figures.warning}
          />

          <Box flexDirection="column">
            {entrypoints.some(({assets}) => assets?.length > 0) ? (
              <Box flexDirection="column">
                <Title>
                  <Text
                    color={colorFromStats(compilation)}
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
                  color={colorFromStats(compilation)}
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
          compiled {compilation?.modules?.length} modules in{` `}
          {duration(compilation?.time) as string}
        </Text>
      </Title>
    </Box>
  )
}

export default Compilation
