import Bud from '@roots/bud-types'

export const copy: Bud.Config.Copy = function (from, to) {
  this.options.set('plugins.copy.patterns', [
    ...this.options.get('plugins.copy.patterns'),
    {
      from,
      to,
    },
  ])

  return this
}
