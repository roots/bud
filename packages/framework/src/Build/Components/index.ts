import Bud from '../../Bud'
import Use from './Use'
import Rule from './Rule'
import {Loader} from 'webpack'
import {Extension} from '../../Extend'

import uses from './uses'
import rules from './rules'
import loaders from './loaders'
import plugins from './plugins'

const makeComponents = (
  bud: Bud,
): {
  uses: Bud.Index<Use>
  rules: Bud.Index<Rule>
  loaders: Bud.Index<Loader>
  plugins: Bud.Index<Extension.Factory>
} => ({
  uses: uses(bud),
  rules: rules(bud),
  loaders,
  plugins,
})

export {makeComponents as default}
