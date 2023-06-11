import type {
  StatsAsset,
  StatsChunkGroup,
} from '@roots/bud-framework/config'

export const color = {
  dim: `dim`,
  foregroundColor: `foregroundColor`,
  backgroundColor: `backgroundColor`,
  red: `red`,
  green: `green`,
  yellow: `yellow`,
  blue: `blue`,
  magenta: `magenta`,
  cyan: `cyan`,
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
