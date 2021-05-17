import {Framework} from '../Framework'
import {Service} from '../Service'
import {Module} from './Module'
import {WebpackPluginInstance} from 'webpack/types'

interface Extensions extends Service {
  add(extension: Module): void

  make(): Extensions.PluginOutput[]

  discard(pkg: string): Framework
}

namespace Extensions {
  export type PluginOutput = WebpackPluginInstance[]
}

export {Extensions}
