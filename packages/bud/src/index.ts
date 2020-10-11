import {Bud} from '@roots/bud-framework'

import * as Babel from '@roots/bud-babel'
import * as PostCSS from '@roots/bud-postcss'

const bud: Framework.Bud = new Bud()

bud.extensions.registerExtension('babel', Babel)
bud.extensions.registerExtension('postcss', PostCSS)

export default bud
module.exports = bud
