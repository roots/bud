export const copy: API.Copy = function (from, to) {
  this.store['components'].set('copy.patterns', [
    ...this.store['plugins'].get('copy.patterns'),
    {
      from,
      to,
    },
  ])

  return this
}
