import {Configuration} from 'webpack'
import {normalize, join} from 'path'

export * as optimization from './optimization'

export * as node from './node'

export * as mod from './module'

export * as output from './output'

export * as resolve from './resolve'

export const bail: Configuration['bail'] = true

export const cache: Configuration['cache'] = false

export const context: Configuration['context'] = normalize(
  join(process.cwd(), 'src'),
)

export const devtool: Configuration['devtool'] = false

export const entry: Configuration['entry'] = {}

export const infrastructureLogging = {
  level: 'none',
}

export const mode: Configuration['mode'] = 'none'

export const name: Configuration['name'] = '@roots/bud'

export const performance: Configuration['performance'] = {
  hints: false,
  maxAssetSize: Infinity,
}

export const parallelism: Configuration['parallelism'] = 1

export const plugins: Configuration['plugins'] = []

export const profile: Configuration['profile'] = false

export const recordsPath: Configuration['recordsPath'] = join(
  process.cwd(),
  '.bud/records.json',
)

export const stats: Configuration['stats'] = 'none'

export const target: Configuration['target'] = 'web'

export const watch: Configuration['watch'] = false
