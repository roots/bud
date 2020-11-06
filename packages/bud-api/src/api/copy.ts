import {lodash as _} from '@roots/bud-support'

export const copy: Framework.API.Copy = function (
  this: Framework.Bud,
  {
    from,
    context = null,
    to = null,
    globOptions = {
      ignore: '.*',
    },
  },
) {
  context = context ?? this.src()
  to = to ?? this.distPath()
  globOptions = globOptions ?? {
    ignore: '.*',
  }

  this.extensions.setOptions('copy', {
    patterns: [
      ...this.extensions.getOptions('copy').patterns,
      {
        from,
        context,
        to,
        globOptions,
        noErrorOnMissing: true,
      },
    ],
  })

  return this
}
