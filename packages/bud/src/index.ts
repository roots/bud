import Bud from './Bud'
import {processHandler} from '@roots/bud-support'
import filesystemSetup from './bootstrap/filesystemSetup'
import parseArguments from './bootstrap/parseArguments'

const bud: Bud = new Bud()

process.on('unhandledRejection', processHandler)

parseArguments.bind(bud)()
filesystemSetup.bind(bud)()

bud.options.set('server.hot', bud.features.enabled('hot'))
bud.mode.is('development') && bud.features.enable('dev')
bud.options.merge('plugins.html.replacements', {
  ...bud.env.repository,
  ...bud.package.repository,
})

export {bud as default}
