import type {Bud} from './types'

type Bundle = (this: Bud, name: string, entries: string[]) => Bud

const bundle: Bundle = function (name, entries) {
  /**
   * Lazy load whatever loaders are needed to fulfill the
   * bundle requirements.
   */
  this.util.usedExt(entries, this)

  /**
   * Set entrypoints.
   */
  this.options.set('entry', {
    ...this.options.get('entry'),
    ...this.hooks.filter('api.bundle.filter', {
      [`${name}`]: entries,
    }),
  })

  this.hooks.call('api.bundle')

  return this
}

export {bundle}
export type {Bundle}
