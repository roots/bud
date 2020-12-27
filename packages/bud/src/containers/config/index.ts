import {Webpack} from '@roots/bud-typings'
import {normalize, join} from 'path'

export * as optimization from './optimization'

export * as node from './node'

export * as mod from './module'

export * as output from './output'

export * as resolve from './resolve'

export const bail: Webpack.Configuration['bail'] = true

export const cache: Webpack.Configuration['cache'] = false

export const context: Webpack.Configuration['context'] = normalize(
  join(process.cwd(), 'src'),
)

export const devtool: Webpack.Configuration['devtool'] = false

export const entry: Webpack.Configuration['entry'] = {}

export const infrastructureLogging = {
  level: 'none',
}

export const mode: Webpack.Configuration['mode'] = 'none'

export const name: Webpack.Configuration['name'] = '@roots/bud'

export const performance: Webpack.Configuration['performance'] = {
  hints: false,
  maxAssetSize: Infinity,
}

export const parallelism: Webpack.Configuration['parallelism'] = 1

export const plugins: Webpack.Configuration['plugins'] = []

export const profile: Webpack.Configuration['profile'] = false

export const recordsPath: Webpack.Configuration['recordsPath'] = join(
  process.cwd(),
  '.bud/records.json',
)

export const stats: Webpack.Configuration['stats'] = 'none'

export const target: Webpack.Configuration['target'] = 'web'

export const watch: Webpack.Configuration['watch'] = false
