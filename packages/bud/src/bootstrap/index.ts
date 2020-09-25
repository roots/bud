import Bud from '../Bud'
import type {BudInterface} from '../'
import filesystemSetup from './filesystemSetup'
import parseArguments from './parseArguments'
import checkUpdate from './checkUpdate'

const bud: BudInterface = new Bud()

process.on('unhandledRejection', bud.util.processHandler)

bud.update = checkUpdate.bind(bud)().update
parseArguments.bind(bud)()
filesystemSetup.bind(bud)()

bud.options.set('server.hot', bud.features.enabled('hot'))
bud.mode.is('development') && bud.features.enable('dev')

bud.options.merge('plugins.html.replacements', {
  ...bud.env.repository,
  ...bud.package.repository,
})

export default bud
