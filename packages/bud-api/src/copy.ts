import {Api} from '@roots/bud-typings'

export const copy: Api.Copy = function (
  from,
  options = {
    to: null,
    context: null,
    noErrorOnMissing: true,
    globOptions: {
      ignore: '.*',
    },
  },
) {
  this.extensions
    .get(`copy-webpack-plugin`)
    .mutate('patterns', patterns => [
      ...patterns,
      {
        from,
        to: options.to ?? this.dist(),
        context: options.context ?? this.src(),
        globOptions: options.globOptions,
        noErrorOnMissing: options.noErrorOnMissing ?? true,
      },
    ])

  return this
}
