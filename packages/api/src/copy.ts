export const copy: Api.Copy = function (
  this: Framework.Bud,
  from,
  to,
) {
  this.extensions.setOptions('copy', {
    patterns: [
      ...this.extensions.getOptions('copy').patterns,
      {
        from: '**/*',
        context: from,
        to: to ? to : this.distPath(from),
        globOptions: {
          ignore: '.*',
        },
        noErrorOnMissing: true,
      },
    ],
  })

  return this
}
