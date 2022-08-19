import figures from 'figures'
import {durationFormatter, sizeFormatter} from 'human-readable'
import type {StatsChunkGroup, StatsCompilation} from 'webpack'

export const VERT = figures.lineVertical
export const SPACE = `\u{200A}`

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

export const longestAssetNameLength = chunks =>
  chunks.reduce((longest: number, asset: StatsChunkGroup) => {
    return asset.name?.length > longest ? asset.name.length : longest
  }, 0) + 1

export const size = sizeFormatter()

export const colorFromCompilation = (compilation: StatsCompilation) =>
  compilation?.errorsCount > 0
    ? color.red
    : compilation?.warningsCount > 0
    ? color.yellow
    : color.green
