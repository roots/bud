import {Config} from '..'

export const copy: Config.Copy = function (from, to) {
  this.store['plugins'].set('copy.patterns', [
    ...this.store['plugins'].get('copy.patterns'),
    {
      from,
      to,
    },
  ])

  return this
}
