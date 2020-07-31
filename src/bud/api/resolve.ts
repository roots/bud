import {join} from 'path'
import type {Resolve} from './types'

const resolve: Resolve = function (moduleName: string): string {
  return require.resolve(
    join(this.paths.get('framework'), 'node_modules', moduleName),
  )
}

export {resolve}
