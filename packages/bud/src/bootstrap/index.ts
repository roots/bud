import Bud from '../Bud'
import {BudInterface} from '../'

import checkEnvIsValid from './checkEnvIsValid'
import filesystemSetup from './filesystemSetup'
import parseArguments from './parseArguments'

/**
 * Bootstrap Bud instance.
 */
const bootstrap = (): BudInterface => {
  let bud: BudInterface = new Bud()

  process.on('unhandledRejection', bud.util.processHandler)

  bud = parseArguments(bud)
  bud = filesystemSetup(bud)
  bud.makeLoaders()

  bud.options.set('server.hot', bud.features.enabled('hot'))
  bud.mode.is('development') && bud.features.enable('dev')

  return bud
}

export {
  bootstrap as default,
  checkEnvIsValid,
  filesystemSetup,
  parseArguments,
}
