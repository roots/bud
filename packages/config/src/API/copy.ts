export const copy: API.Copy = function (
  this: Framework.Bud,
  from,
  to,
) {
  this.extensions.setOptions('copy', {
    patterns: [
      ...this.extensions.getOptions('copy').patterns,
      {
        from,
        to,
      },
    ],
  })

  return this
}
