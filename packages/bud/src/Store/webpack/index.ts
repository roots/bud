import node from './node'
import output from './output'
import optimization from './optimization'
import resolve from './resolve'
import {Configuration} from 'webpack'
import {normalize, join} from 'path'

const name: Configuration['name'] = '@roots/bud'
const entry: Configuration['entry'] = {}
const mode: Configuration['mode'] = 'none'
const watch: Configuration['watch'] = false
const performance: Configuration['performance'] = false
const plugins: Configuration['plugins'] = []
const profile: Configuration['profile'] = true
const stats: Configuration['stats'] = false
const target: Configuration['target'] = 'web'
const bail: Configuration['bail'] = false
const parallelism: Configuration['parallelism'] = 1
const context: Configuration['context'] = normalize(
  join(process.cwd(), 'src'),
)
const devtool: Configuration['devtool'] =
  '#@cheap-eval-source-map'

export default {
  name,
  mode,
  devtool,
  context,
  entry,
  output,
  node,
  optimization,
  performance,
  resolve,
  plugins,
  stats,
  target,
  profile,
  watch,
  bail,
  parallelism,
}
