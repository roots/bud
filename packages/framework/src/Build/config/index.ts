import {Configuration} from 'webpack'
import {normalize, join} from 'path'

export * as optimization from './optimization'

export * as node from './node'

export * as mod from './module'

export * as output from './output'

export * as resolve from './resolve'

export const name: Configuration['name'] = '@roots/bud'

export const entry: Configuration['entry'] = {}

export const mode: Configuration['mode'] = 'none'

export const watch: Configuration['watch'] = false

export const performance: Configuration['performance'] = false

export const plugins: Configuration['plugins'] = []

export const profile: Configuration['profile'] = false

export const stats: Configuration['stats'] = true

export const target: Configuration['target'] = 'web'

export const bail: Configuration['bail'] = false

export const parallelism: Configuration['parallelism'] = 1

export const context: Configuration['context'] = normalize(
  join(process.cwd(), 'src'),
)

export const devtool: Configuration['devtool'] = false
