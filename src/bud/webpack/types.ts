import type {Configuration as WebpackConfig} from 'webpack'
import type {Bud} from '../types'

export type {Extension, Plugins} from '../repositories/plugins/types'

export type {Bud}
export declare type BuilderController = {
  bud: Bud
  final: WebpackConfig
  builders: RegisteredBuilder[]
  merge: (configValues: Object) => void
  make: () => WebpackConfig
}
export declare type RegisteredBuilder = [string, BuilderConstructor]
export declare type BuilderConstructor = (bud: Bud) => Builder
export declare interface Builder {
  bud: Bud
  options?: {}
  final?: {}
  make: () => any
}
export declare interface EntryBuilder extends Builder {
  make: () => WebpackConfig['entry']
}
export declare interface OutputBuilder extends Builder {
  make: () => WebpackConfig['output']
}
