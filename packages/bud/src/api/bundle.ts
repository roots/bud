import type {Bud} from './types'

type Bundle = (this: Bud, name: string, entries: string[]) => Bud

const bundle: Bundle = function (name, entries) {
  this.util.usedExt(entries, this)

  this.options.set('entry', {
    ...this.options.get('entry'),
    ...this.hooks.filter('api.bundle.filter', {
      [`${name}`]: entries,
    }),
  })

  return this
}

export {bundle}
export type {Bundle}
