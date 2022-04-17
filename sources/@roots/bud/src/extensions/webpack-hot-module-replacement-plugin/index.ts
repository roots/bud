import {HotModuleReplacementPlugin} from './webpack-hot-module-replacement.dependencies'
import type {Plugin} from './webpack-hot-module-replacement.interface'

export const label = 'webpack-hot-module-replacement-plugin'

export const make: Plugin['make'] = () => new HotModuleReplacementPlugin()

export const when: Plugin['when'] = app => app.isDevelopment
