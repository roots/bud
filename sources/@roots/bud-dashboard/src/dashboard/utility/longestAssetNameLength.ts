import type {StatsAsset, StatsChunkGroup} from '@roots/bud-support/webpack'

export const longestAssetNameLength = (chunks: StatsChunkGroup) =>
  chunks?.reduce((longest: number, asset: StatsAsset) => {
    return Math.max(asset.name?.length, longest)
  }, 0) + 1
