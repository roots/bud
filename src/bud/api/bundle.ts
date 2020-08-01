import type {Bud, Bundle} from './types'

const bundle: Bundle = function (this: Bud, name: string, entries: string[]): Bud {
  this.hooks.call('pre_bundle', {name, entries})
  /**
   * Lazy load whatever loaders are needed to fulfill the
   * bundle requirements.
   */
  this.util.usedExt(entries, this)

  this.options.set('entry', {
    ...this.options.get('entry'),
    ...this.hooks.filter('filter_bundle_options', {
      [`${name}`]: entries,
    }),
  })

  this.hooks.call('post_bundle')

  return this
}

export {bundle}
