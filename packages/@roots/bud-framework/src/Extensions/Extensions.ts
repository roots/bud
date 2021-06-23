import {Service} from '../Service'
import {Module} from './Module'
import {WebpackPluginInstance} from 'webpack/types'

interface Extensions extends Service {
  add(extension: Module): void

  make(): Extensions.PluginOutput[]
}

namespace Extensions {
  export type PluginOutput = WebpackPluginInstance[]
}

export {Extensions}
