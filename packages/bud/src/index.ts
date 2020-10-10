import {Bud} from '@roots/bud-framework/lib/Bud'

import * as Babel from '@roots/bud-babel'
import * as PostCSS from '@roots/bud-postcss'

import {processHandler} from '@roots/bud-support/lib/util/processHandler'

process.on('unhandledRejection', processHandler)

const bud: Framework.Bud = new Bud()

bud.extensions.registerExtension('babel', Babel)
bud.extensions.registerExtension('postcss', PostCSS)

export default bud
module.exports = bud
