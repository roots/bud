import {mergePlugins} from './mergePlugins'
import {setPlugins} from './setPlugins'
import {addPlugin} from './addPlugin'
import {mergeConfig} from './mergeConfig'
import {setConfig} from './setConfig'
import {setPresets} from './setPresets'
import {mergePresets} from './mergePresets'
import {addPreset} from './addPreset'
import {Framework} from '@roots/bud-typings'

export const make: (app: Framework) => void = app => {
  app['babel'] = {
    mergeConfig,
    setConfig,
    mergePlugins,
    setPlugins,
    addPlugin,
    mergePresets,
    setPresets,
    addPreset,
  }
}

export interface BabelConfig {
  app: Framework
  mergeConfig: typeof mergeConfig
  setPlugins: typeof setPlugins
}
