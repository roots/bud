import Bud from '@roots/bud-framework/lib/Bud'
import {processHandler} from '@roots/bud-support/lib/util/processHandler'

process.on('unhandledRejection', processHandler)

const bud = new Bud()

export default bud
module.exports = bud
