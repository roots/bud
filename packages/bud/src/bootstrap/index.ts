import Bud from '../Bud'
import type {BudInterface} from '../'
import filesystemSetup from './filesystemSetup'
import parseArguments from './parseArguments'

let bud: BudInterface = new Bud()

process.on('unhandledRejection', bud.util.processHandler)

bud = parseArguments(bud)
bud = filesystemSetup(bud)

bud.options.set('server.hot', bud.features.enabled('hot'))
bud.mode.is('development') && bud.features.enable('dev')

bud.options.merge('plugins.html.replacements', {
  ...bud.env.repository,
  ...bud.package.repository,
})

export {bud as default}
