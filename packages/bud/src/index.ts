import {Bud} from '@roots/bud-framework'
import {ingestConfig} from './helpers/ingestConfig'

import * as api from '@roots/bud-api'
import * as containers from './containers'
import * as plugins from './plugins'

import {builders} from './builders'
import {services} from './services'

/**
 * Instantiate Bud.
 */
const bud: Framework.Bud = new Bud({
  api,
  builders,
  containers,
  plugins,
  services,
})

/**
 * Set @roots org namespace disk
 */
bud.disk.set('@roots', {
  baseDir: bud.fs.path.resolve(__dirname, '../../'),
  glob: ['**/*'],
})

bud.disk.set('project', {
  baseDir: process.cwd(),
  glob: ['**/*'],
})

bud.projectPath(
  bud.args.has('project')
    ? bud.fs.path.resolve(
        bud.disk.baseDir,
        bud.args.get('project'),
      )
    : process.cwd(),
)
bud.srcPath(bud.args.has('src') ? bud.args.get('src') : 'src')
bud.distPath(
  bud.args.has('dist') ? bud.args.get('dist') : 'dist',
)

bud.fs.exists('package.json') &&
  ingestConfig(bud.store, 'pkg', bud.fs.readJson('package.json'))
bud.fs.exists('babel.config.js') &&
  ingestConfig(
    bud.store,
    'babel',
    bud.fs.require('babel.config.js'),
  )
bud.fs.exists('postcss.config.js') &&
  ingestConfig(
    bud.store,
    'postcss',
    bud.fs.require('postcss.config.js'),
  )
bud.fs.exists('.browserslist') &&
  ingestConfig(
    bud.store,
    'browserslist',
    bud.fs.require('.browserslist'),
  )

bud.features.enabled('html') && bud.template()

bud.features.enabled('minify') && bud.minify()

bud.features.enabled('gzip') && bud.gzip()

bud.features.enabled('brotli') && bud.brotli()

bud.features.enabled('hash') && bud.hash()

bud.features.enabled('runtime') && bud.runtime()

bud.features.enabled('vendor') && bud.vendor()

bud.features.enabled('devtool') &&
  (() => {
    bud.devtool(
      bud.args.get('devtool') ?? '#@cheap-eval-source-map',
    )
  })

export default bud
module.exports = bud
