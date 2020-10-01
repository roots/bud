import Bud from './Bud'
import {processHandler} from '@roots/bud-support'
import filesystemSetup from './bootstrap/filesystemSetup'
import parseArguments from './bootstrap/parseArguments'

const bud: Bud = new Bud()

process.on('unhandledRejection', processHandler)

parseArguments.bind(bud)()
filesystemSetup.bind(bud)()

export {bud as default}
module.exports = bud
