import Bud from '@roots/bud-types'

export const copy: Bud.Config.Copy = function (from, to) {
  this.store['plugins'].set('copy.patterns', [
    ...this.store['plugins'].get('copy.patterns'),
    {
      from,
      to,
    },
  ])

  return this
}
