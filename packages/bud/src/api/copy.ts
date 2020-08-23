import {Bud} from './types'
import {join} from 'path'

type Copy = (this: Bud, from: string, to: string) => Bud

const copy: Copy = function (from, to?) {
  this.options.set('webpack.plugins.copy.patterns', [
    ...this.options.get('webpack.plugins.copy.patterns'),
    {
      from,
      to: to ?? join(this.paths.get('dist'), from),
    },
  ])

  return this
}

export {copy}
export type {Copy}
