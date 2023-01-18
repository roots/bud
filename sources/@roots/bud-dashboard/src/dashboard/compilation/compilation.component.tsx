import {relative} from 'node:path/posix'

import type {Context} from '@roots/bud-framework/options/context'
import figures from '@roots/bud-support/figures'
import Ink from '@roots/bud-support/ink'
import React from '@roots/bud-support/react'
import type {
  StatsAsset,
  StatsChunkGroup,
  StatsCompilation,
} from '@roots/bud-support/webpack'

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
  context: Context
}

interface AssetGroup extends StatsChunkGroup {
  assets?: Array<Partial<StatsAsset> & {name: string}>
}

const onlyNotHot = ({name}: StatsAsset) => !name?.includes(`hot-update`)
const onlyStatic = ({info}: StatsAsset) => info?.copied
const makeAssetGroupCallback =
  (assets?: {name: string}[]) =>
  (asset: Partial<StatsAsset>): Partial<StatsAsset> => {
    const assetModule = assets?.find(a => a?.name === asset?.name)
    return {...(asset ?? {}), ...(assetModule ?? {})}
  }

const Compilation = ({
  displayAssets,
  displayEntrypoints,
  compilation,
  context,
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

  return (
    <Ink.Box flexDirection="column">
      <Ink.Box flexDirection="row">
        <Ink.Text color={colorFromStats(compilation)}>
          {compilation.errorsCount > 0
            ? figures.cross
            : figures.circleFilled}
        </Ink.Text>

        <Ink.Text>{`  `}</Ink.Text>
        <Ink.Text>{compilation.name}</Ink.Text>
        <Ink.Text> {``}</Ink.Text>

        {compilation.outputPath && (
          <Ink.Text color={color.blue}>
            ./{relative(context.basedir, compilation.outputPath)}
          </Ink.Text>
        )}

        <Ink.Text>{` `}</Ink.Text>

        <Ink.Text dimColor>[{compilation.hash}]</Ink.Text>
      </Ink.Box>

      {!compilation.isChild && (
        <>
          <Ink.Text dimColor>{VERT}</Ink.Text>

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

          <Ink.Box flexDirection="column">
            {entrypoints.some(({assets}) => assets?.length > 0) ? (
              <Ink.Box flexDirection="column">
                <Title>
                  <Ink.Text
                    color={colorFromStats(compilation)}
                    dimColor={displayEntrypoints === false}
                  >
                    <Ink.Text underline>e</Ink.Text>ntrypoints
                  </Ink.Text>
                </Title>

                {displayEntrypoints
                  ? entrypoints
                      .filter(({assets}) => assets.length > 0)
                      .map((chunk: StatsChunkGroup, id: number) => (
                        <Ink.Box key={id} flexDirection="column">
                          <ChunkGroup
                            indent={[true]}
                            {...chunk}
                            minWidth={longestEntrypointAssetLength}
                            final={id === entrypoints.length - 1}
                          />
                        </Ink.Box>
                      ))
                  : null}
                <Space>
                  <Ink.Text> </Ink.Text>
                </Space>
              </Ink.Box>
            ) : null}
          </Ink.Box>

          {assets?.length > 0 ? (
            <Ink.Box flexDirection="column">
              <Title>
                <Ink.Text
                  color={colorFromStats(compilation)}
                  dimColor={displayAssets === false}
                >
                  <Ink.Text underline>a</Ink.Text>ssets
                </Ink.Text>
              </Title>

              {displayAssets ? (
                <>
                  <Chunk assets={assets} indent={[true]} />

                  <Space>
                    <Ink.Text> </Ink.Text>
                  </Space>

                  {truncatedAssets?.length > 0 && (
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
                  )}
                </>
              ) : null}
            </Ink.Box>
          ) : null}

          <Space>
            <Ink.Text> </Ink.Text>
          </Space>
        </>
      )}

      <Title final={true}>
        <Ink.Text dimColor>
          compiled {compilation.modules?.length} modules in{` `}
          {duration(compilation.time) as string}
        </Ink.Text>
      </Title>
    </Ink.Box>
  )
}

export default Compilation
