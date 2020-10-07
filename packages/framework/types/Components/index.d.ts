import {Loader} from 'webpack'
import Bud from '../Bud'
import Use from './Use'
import Rule from './Rule'
import uses from './uses'
import rules from './rules'
import loaders from './loaders'
declare const makeComponents: (
  bud: Bud,
) => {
  uses: Framework.Index<Use>
  rules: Framework.Index<Rule>
  loaders: Framework.Index<Loader>
}
export {makeComponents as default}
//# sourceMappingURL=index.d.ts.map
