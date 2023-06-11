import type {
  StatsAsset,
  StatsChunkGroup,
  StatsCompilation,
} from '@roots/bud-framework/config'
import type {Context} from '@roots/bud-framework/options/context'

import figures from '@roots/bud-support/figures'
import {duration} from '@roots/bud-support/human-readable'
import * as Ink from '@roots/bud-support/ink'
import {relative} from 'node:path'

import Chunk from '../chunk/chunk.component.js'
import ChunkGroup from '../chunk/chunkgroup.component.js'
import Space from '../display/space.component.js'
import Title from '../display/title.component.js'
import {color, colorFromStats, longestAssetNameLength} from '../format.js'

interface Props {
  compilation: StatsCompilation
  context: Context
  displayAssets: boolean
  displayEntrypoints: boolean
}

interface AssetGroup extends StatsChunkGroup {
  assets?: Array<Partial<StatsAsset> & {name: string}>
}

const onlyNotHot = ({name}: StatsAsset) => !name?.includes(`hot-update`)
const onlyStatic = ({name}: StatsAsset) =>
  ![`.css`, `.js`].some(ext => name?.includes(ext))

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
      assets: entrypoint.assets.map(groupAssets),
    }))

  const assets: Array<AssetGroup> = compilation.assets
    .filter(onlyNotHot)
    .filter(onlyStatic)
    .filter(Boolean)
    .map(groupAssets)

  const truncatedAssets: Array<AssetGroup> = assets.splice(5)

  const longestEntrypointAssetLength: number = entrypoints.reduce(
    (longest: number, entry: AssetGroup) =>
      Math.max(longestAssetNameLength(entry.assets), longest),
    0,
  )

  const uncachedModuleCount = compilation.modules?.filter(
    module => !module.cached,
  )?.length

  return (
    <Ink.Box flexDirection="column">
      <Ink.Box flexDirection="row">
        <Ink.Text dimColor>
          {figures.lineDownRightArc}
          {figures.line}
        </Ink.Text>
        <Ink.Text color={colorFromStats(compilation)}>
          {compilation.errorsCount > 0 ? ` ${figures.cross}` : ``}
        </Ink.Text>
        <Ink.Text>{` `}</Ink.Text>
        <Ink.Text>{compilation.name}</Ink.Text>
        <Ink.Text>{` `}</Ink.Text>

        {compilation.outputPath ? (
          <Ink.Text color={color.blue}>
            ./{relative(context.basedir, compilation.outputPath)}
          </Ink.Text>
        ) : null}

        <Ink.Text>{` `}</Ink.Text>

        <Ink.Text dimColor>[{compilation.hash}]</Ink.Text>
      </Ink.Box>

      {!compilation.isChild ? (
        <>
          <Ink.Text dimColor>{figures.lineVertical}</Ink.Text>

          <Ink.Box flexDirection="column">
            {entrypoints.some(({assets}) => assets?.length > 0) ? (
              <Ink.Box flexDirection="column">
                <Title>
                  <Ink.Text
                    color={colorFromStats(compilation)}
                    dimColor={displayEntrypoints === false}
                  >
                    entrypoints
                  </Ink.Text>
                </Title>

                {displayEntrypoints
                  ? entrypoints
                      .filter(({assets}) => assets.length > 0)
                      .map((chunk: StatsChunkGroup, id: number) => (
                        <Ink.Box flexDirection="column" key={id}>
                          <ChunkGroup
                            indent={[true]}
                            {...chunk}
                            final={id === entrypoints.length - 1}
                            minWidth={longestEntrypointAssetLength}
                          />
                        </Ink.Box>
                      ))
                  : null}
              </Ink.Box>
            ) : null}
          </Ink.Box>

          {assets?.length > 0 ? (
            <>
              <Space>
                <Ink.Text> </Ink.Text>
              </Space>

              <Ink.Box flexDirection="column">
                <Title>
                  <Ink.Text
                    color={colorFromStats(compilation)}
                    dimColor={displayAssets === false}
                  >
                    assets
                  </Ink.Text>
                </Title>

                {displayAssets ? (
                  <>
                    <Chunk assets={assets} indent={[true]} />

                    {truncatedAssets?.length > 0 ? (
                      <>
                        <Space>
                          <Ink.Text> </Ink.Text>
                        </Space>

                        <Space>
                          <Ink.Text dimColor>
                            {` `}
                            {figures.ellipsis}
                            {` `}
                            {truncatedAssets.length}
                            {` `}
                            additional asset(s) not shown
                          </Ink.Text>
                        </Space>
                      </>
                    ) : null}
                  </>
                ) : null}
              </Ink.Box>
            </>
          ) : null}
        </>
      ) : null}

      <Space>
        <Ink.Text> </Ink.Text>
      </Space>

      <Title final finalFigure={figures.lineUpRightArc}>
        <Ink.Text dimColor>
          compiled {compilation.modules?.length} modules (
          {compilation.modules?.length - uncachedModuleCount} cached) in
          {` `}
          {duration(compilation.time) as string}
        </Ink.Text>
      </Title>
    </Ink.Box>
  )
}

export default Compilation
