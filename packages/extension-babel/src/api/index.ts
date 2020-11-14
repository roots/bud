import {mergePlugins} from './mergePlugins'
import {setPlugins} from './setPlugins'
import {addPlugin} from './addPlugin'
import {mergeConfig} from './mergeConfig'
import {setConfig} from './setConfig'
import {setPresets} from './setPresets'
import {mergePresets} from './mergePresets'
import {addPreset} from './addPreset'
import {Bud} from '@roots/bud-typings'

export const make: (bud: Bud.App) => void = bud => {
  const babel = {}

  new Set([
    mergeConfig,
    setConfig,
    mergePlugins,
    setPlugins,
    addPlugin,
    mergePresets,
    setPresets,
    addPreset,
  ]).forEach((fn: Fluent<Bud.App>) => {
    Object.assign(babel, {
      [fn.name]: fn.bind(bud),
    })
  })

  Object.assign(bud, {
    babel: Object.create(babel),
  })
}

export type Fluent<T> = (this: T, ...rest: any[]) => T

export interface BabelConfig {
  bud: Bud.App
  mergeConfig: typeof mergeConfig
  setPlugins: typeof setPlugins
}
