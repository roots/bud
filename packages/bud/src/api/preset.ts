import type {Preset} from './types'

const preset: Preset = function (presetKey: string): any {
  return require(this.presets.get(presetKey))
}

export {preset}
