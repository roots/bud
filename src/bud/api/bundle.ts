import type {Bud, Bundle} from './types'

const bundle: Bundle = function (
  this: Bud,
  name: string,
  entries: string[],
): Bud {
  this.hooks.call('pre_bundle', {name, entries})

  this.options.merge(
    'entry',
    this.hooks.filter('filter_bundle_options', {
      [`${name}`]: entries,
    }),
  )

  this.hooks.call('post_bundle')

  return this
}

export {bundle}
