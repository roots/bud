import {Bud} from '@roots/bud-framework'
import {processHandler} from '@roots/bud-support'

const bud = new Bud()

process.on('unhandledRejection', processHandler)

export default bud
module.exports = bud
