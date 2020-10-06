import {Loader} from 'webpack'

import Bud from '../Bud'

import Use from './Use'
import Rule from './Rule'

import uses from './uses'
import rules from './rules'
import loaders from './loaders'

const makeComponents = (
  bud: Bud,
): {
  uses: Bud.Index<Use>
  rules: Bud.Index<Rule>
  loaders: Bud.Index<Loader>
} => ({
  uses: uses(bud),
  rules: rules(bud),
  loaders: loaders(bud),
})

export {makeComponents as default}
