import Bud from './Bud'
import {processHandler} from '@roots/bud-support'
import filesystemSetup from './bootstrap/filesystemSetup'
import parseArguments from './bootstrap/parseArguments'

const bud: Bud = new Bud()

process.on('unhandledRejection', processHandler)

parseArguments.bind(bud)()
filesystemSetup.bind(bud)()

const [server, features, webpack] = [
  bud.store.use('server'),
  bud.store.use('features'),
  bud.store.use('webpack'),
]

webpack.set('output.publicPath', '/foo')
features.enabled('hot') && server.enable('hot')
bud.mode.is('development') && features.enabled('dev')

/* plugins.merge('html.replacements', {
  ...bud.env.repository,
  ...bud.package.repository,
}) */

module.exports = bud
export {bud as default}
