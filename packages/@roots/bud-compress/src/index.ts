import './interface'
import type {Module} from '@roots/bud-framework'

import brotli from './brotli/index'
import gzip from './gzip/index'

const extension: Module = {
  name: '@roots/bud-compress',
  boot: ({extensions}) =>
    [brotli, gzip].forEach(plugin => extensions.add(plugin)),
}

export default extension
export const {name, boot} = extension
