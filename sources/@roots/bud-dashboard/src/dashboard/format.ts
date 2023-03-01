import type {StatsAsset, StatsChunkGroup} from '@roots/bud-support/webpack'
import {durationFormatter, sizeFormatter} from 'human-readable'

export const SPACE = ` `

export const color = {
  dim: `#8f908d`,
  foregroundColor: `#eff0eb`,
  backgroundColor: `#282a36`,
  red: `#ff5c57`,
  green: `#5af78e`,
  yellow: `#f3f99d`,
  blue: `#57c7ff`,
  magenta: `#ff6ac1`,
  cyan: `#9aedfe`,
}

export const duration = durationFormatter({
  allowMultiples: [`s`, `ms`],
})

export const longestAssetNameLength = (chunks: StatsChunkGroup) =>
  chunks?.reduce((longest: number, asset: StatsAsset) => {
    return Math.max(asset.name?.length, longest)
  }, 0) + 1

export const size: (int: number) => string = sizeFormatter()

export const colorFromStats = (compilation: {
  errorsCount?: number
  warningsCount?: number
}) =>
  compilation.errorsCount > 0
    ? color.red
    : compilation.warningsCount > 0
    ? color.yellow
    : color.green
