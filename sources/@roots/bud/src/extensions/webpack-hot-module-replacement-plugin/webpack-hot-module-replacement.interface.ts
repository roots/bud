import {Extension} from '@roots/bud-framework'
import {HotModuleReplacementPlugin} from 'webpack'

export type Plugin = Extension.Plugin<HotModuleReplacementPlugin, any>
