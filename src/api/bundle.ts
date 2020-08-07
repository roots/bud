import type {Bud, Bundle} from './types'

const bundle: Bundle = function (this: Bud, name: string, entries: string[]): Bud {
  this.logger.info(
    {name: 'bud.api', function: 'bud.bundle', entries},
    `bud.bundle called`,
  )

  this.hooks.call('api.bundle.pre', {name, entries})
  /**
   * Lazy load whatever loaders are needed to fulfill the
   * bundle requirements.
   */
  this.util.usedExt(entries, this)

  this.options.set('entry', {
    ...this.options.get('entry'),
    ...this.hooks.filter('api.bundle.filter', {
      [`${name}`]: entries,
    }),
  })

  this.hooks.call('api.bundle.post')

  return this
}

export {bundle}
