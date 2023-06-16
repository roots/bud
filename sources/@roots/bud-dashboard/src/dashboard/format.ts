import type {
  StatsAsset,
  StatsChunkGroup,
} from '@roots/bud-framework/config'

export const longestAssetNameLength = (chunks: StatsChunkGroup) =>
  chunks?.reduce((longest: number, asset: StatsAsset) => {
    return Math.max(asset.name?.length, longest)
  }, 0) + 1

export const colorFromStats = (compilation: {
  errorsCount?: number
  warningsCount?: number
}) =>
  compilation.errorsCount > 0
    ? `red`
    : compilation.warningsCount > 0
    ? `yellow`
    : `green`
