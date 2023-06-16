import type {
  StatsAsset,
  StatsChunkGroup,
  StatsCompilation,
} from '@roots/bud-framework/config'
import type {Context} from '@roots/bud-framework/options/context'

import figures from '@roots/bud-support/figures'
import {duration} from '@roots/bud-support/human-readable'
import {Box, Text} from '@roots/bud-support/ink'
import {relative} from 'node:path'

import Chunk from '../chunk/chunk.component.js'
import ChunkGroup from '../chunk/chunkgroup.component.js'
import Space from '../display/space.component.js'
import Title from '../display/title.component.js'
import {colorFromStats, longestAssetNameLength} from '../format.js'

interface Props {
  compilation: StatsCompilation
  context: Context
  displayAssets: boolean
  displayEntrypoints: boolean
}

interface AssetGroup extends StatsChunkGroup {
  assets?: Array<Partial<StatsAsset> & {name: string}>
}

const makeAssetGroupCallback =
  (assets?: {name: string}[]) =>
  (asset: Partial<StatsAsset>): Partial<StatsAsset> => {
    const assetModule = assets?.find(a => a?.name === asset?.name)
    return {...(asset ?? {}), ...(assetModule ?? {})}
  }

const Compilation = ({
  compilation,
  context,
  displayAssets,
  displayEntrypoints,
}: Props) => {
  if (!compilation) return null

  const groupAssets = makeAssetGroupCallback(compilation.assets)

  const entrypoints: AssetGroup = Object.values(compilation.entrypoints)
    .filter(Boolean)
    .map(entrypoint => ({
      ...entrypoint,
      assets: entrypoint.assets
        .map(groupAssets)
        .filter(asset => asset.name),
    }))

  const assets: Array<AssetGroup> = compilation.assets
    .filter(Boolean)
    .map(groupAssets)
    .filter(
      asset =>
        asset.name &&
        !asset.name.endsWith(`js`) &&
        !asset.name.endsWith(`css`),
    )
    .filter(asset => asset.emitted)

  const truncatedAssets: Array<AssetGroup> = assets.splice(5)

  const longestAssetLength: number = [
    ...entrypoints.map(entry => entry.assets),
    truncatedAssets,
  ].reduce(
    (longest: number, assets: AssetGroup) =>
      Math.max(longestAssetNameLength(assets), longest),
    0,
  )

  const reportableModules = compilation.assets

  const emittedModuleCount = reportableModules.filter(
    module => module.emitted,
  ).length

  return (
    <Box flexDirection="column">
      <Box flexDirection="row">
        <Text dimColor>
          {figures.lineDownRightArc}
          {figures.line}
        </Text>
        <Text color={colorFromStats(compilation)}>
          {compilation.errorsCount > 0 ? ` ${figures.cross}` : ``}
        </Text>
        <Text>{` `}</Text>
        <Text>{compilation.name}</Text>
        <Text>{` `}</Text>

        {compilation.outputPath ? (
          <Text color="blue">
            ./{relative(context.basedir, compilation.outputPath)}
          </Text>
        ) : null}

        <Text>{` `}</Text>

        <Text dimColor>[{compilation.hash}]</Text>
      </Box>

      <>
        <Text dimColor>{figures.lineVertical}</Text>

        <Box flexDirection="column">
          {entrypoints.some(({assets}) => assets?.length > 0) ? (
            <Box flexDirection="column">
              <Title>
                <Text
                  color={colorFromStats(compilation)}
                  dimColor={displayEntrypoints === false}
                >
                  entrypoints
                </Text>
              </Title>

              {displayEntrypoints
                ? entrypoints
                    .filter(({assets}) => assets.length > 0)
                    .map((chunk: StatsChunkGroup, id: number) => (
                      <Box flexDirection="column" key={id}>
                        <ChunkGroup
                          indent={[true]}
                          {...chunk}
                          final={id === entrypoints.length - 1}
                          minWidth={longestAssetLength + 3}
                        />
                      </Box>
                    ))
                : null}
            </Box>
          ) : null}
        </Box>

        {assets?.length > 0 ? (
          <>
            <Space>
              <Text> </Text>
            </Space>

            <Box flexDirection="column">
              <Title>
                <Text
                  color={colorFromStats(compilation)}
                  dimColor={displayAssets === false}
                >
                  assets
                </Text>
              </Title>

              {displayAssets ? (
                <>
                  <Chunk
                    assets={assets}
                    indent={[true]}
                    minWidth={longestAssetLength + 6}
                  />

                  {truncatedAssets?.length > 0 ? (
                    <>
                      <Space>
                        <Text> </Text>
                      </Space>

                      <Space>
                        <Text dimColor>
                          {` `}
                          {figures.ellipsis}
                          {` `}
                          {truncatedAssets.length}
                          {` `}
                          additional asset(s) not shown
                        </Text>
                      </Space>
                    </>
                  ) : null}
                </>
              ) : null}
            </Box>
          </>
        ) : null}
      </>

      <Space>
        <Text> </Text>
      </Space>

      <Title final finalFigure={figures.lineUpRightArc}>
        <Text>
          {emittedModuleCount === 0 &&
          compilation.errorsCount === 0 &&
          compilation.warningsCount === 0
            ? `✨ No changes to built assets (${duration(
                compilation.time,
              )})`
            : `Built ${emittedModuleCount} assets in ${duration(
                compilation.time,
              )}`}
        </Text>
      </Title>
    </Box>
  )
}

export default Compilation
