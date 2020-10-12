import {Bud} from '@roots/bud-framework'
import {preflight} from './preflight'
import * as Babel from '@roots/bud-babel'
import * as PostCSS from '@roots/bud-postcss'

const bud: Framework.Bud = new Bud()

preflight(bud)

bud.extensions.register('babel', Babel)
bud.extensions.register('postcss', PostCSS)

export default bud
module.exports = bud
