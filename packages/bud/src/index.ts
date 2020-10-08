import Bud from '@roots/bud-framework/lib/Bud'
import {processHandler} from '@roots/bud-support/lib/util/processHandler'

console.log(Bud)
const bud = new Bud()

process.on('unhandledRejection', processHandler)

export default bud
module.exports = bud
