import Framework from '@roots/bud-framework'
import Bud from '@roots/bud-framework/lib/Bud'
import * as PostCSS from '@roots/bud-postcss'

import {processHandler} from '@roots/bud-support/lib/util/processHandler'

process.on('unhandledRejection', processHandler)

const bud: Framework.Bud = new Bud()

bud.extensions.registerExtension('postcss', PostCSS)

export default bud
module.exports = bud
