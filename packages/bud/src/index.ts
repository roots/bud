import Bud from './Bud'
import {processHandler} from '@roots/bud-support'
import filesystemSetup from './bootstrap/filesystemSetup'
import parseArguments from './bootstrap/parseArguments'

const bud: Bud = new Bud()

process.on('unhandledRejection', processHandler)

parseArguments.bind(bud)()
filesystemSetup.bind(bud)()

bud.store['webpack'].set('output.publicPath', '/')
bud.store['webpack'].set('mode', bud.mode.get())
bud.store['features'].enabled('hot') &&
  bud.store['server'].enable('hot')

bud.mode.is('development') &&
  bud.store['features'].enabled('dev')

bud.store['plugins'].merge('html.replacements', {
  ...bud.store['env'].repository,
  ...bud.store['package'].repository,
})

export {bud as default}
module.exports = bud
