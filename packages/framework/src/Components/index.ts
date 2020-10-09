import {Loader} from 'webpack'

import Bud from '../Bud'

import Item from './Item'
import Rule from './Rule'

import items from './items'
import rules from './rules'
import loaders from './loaders'

const makeComponents = (
  bud: Bud,
): {
  items: Framework.Index<Item>
  rules: Framework.Index<Rule>
  loaders: Framework.Index<Loader>
} => ({
  items: items(bud),
  rules: rules(bud),
  loaders: loaders(bud),
})

export {makeComponents as default}
