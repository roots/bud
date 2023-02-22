import figures from '@roots/bud-support/figures'
import {duration, size} from '@roots/bud-support/human-readable'
import type {StatsAsset, StatsChunkGroup} from '@roots/bud-support/webpack'

export const VERT = figures.lineVertical
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

export {duration, size}

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
