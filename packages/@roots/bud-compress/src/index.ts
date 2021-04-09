import './interface'
import {Module} from '@roots/bud-framework'

import * as brotli from './brotli'
import * as gzip from './gzip'

export const name: Module['name'] = '@roots/bud-compress'
export const boot: Module['boot'] = ({extensions}) => {
  extensions.add(brotli)
  extensions.add(gzip)
}
