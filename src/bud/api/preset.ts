import {join} from 'path'
import type {Preset} from './types'

const preset: Preset = function (relativePath): any {
  const presetConfig = join(
    this.state.paths.framework,
    'preset',
    relativePath,
  )

  return require(presetConfig)
}

export {preset}
