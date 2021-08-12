import './interface'

import type {Framework} from '@roots/bud-framework'

import brotli from './brotli/index'
import gzip from './gzip/index'

const extension: Framework.Compress.Extension = {
  name: '@roots/bud-compress',

  boot: ({extensions}) =>
    [brotli, gzip].forEach(plugin => extensions.add(plugin)),
}

export default extension
export const {name, boot} = extension
