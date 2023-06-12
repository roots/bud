import type {
  StatsAsset,
  StatsChunkGroup,
} from '@roots/bud-framework/config'

export const color = {
  backgroundColor: `backgroundColor`,
  blue: `blue`,
  cyan: `cyan`,
  dim: `dim`,
  foregroundColor: `foregroundColor`,
  green: `green`,
  magenta: `magenta`,
  red: `red`,
  yellow: `yellow`,
}

export const longestAssetNameLength = (chunks: StatsChunkGroup) =>
  chunks?.reduce((longest: number, asset: StatsAsset) => {
    return Math.max(asset.name?.length, longest)
  }, 0) + 1

export const colorFromStats = (compilation: {
  errorsCount?: number
  warningsCount?: number
}) =>
  compilation.errorsCount > 0
    ? color.red
    : compilation.warningsCount > 0
    ? color.yellow
    : color.green
