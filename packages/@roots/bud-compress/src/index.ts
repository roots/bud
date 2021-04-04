import './interface'
import {Framework} from '@roots/bud-framework'
import {Module} from '@roots/bud-typings'
import * as brotli from './brotli'
import * as gzip from './gzip'

export const name: Module['name'] = '@roots/bud-compress'
export const boot: Module['boot'] = ({
  extensions,
}: Framework) => {
  extensions.add(brotli)
  extensions.add(gzip)
}
