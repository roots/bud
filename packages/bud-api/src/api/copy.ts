import {lodash as _} from '@roots/bud-support'
import {Bud} from '@roots/bud-typings'

export const copy = function (
  this: Bud.Contract,
  {
    from,
    context = null,
    to = null,
    globOptions = {
      ignore: '.*',
    },
  }: {
    from: string
    context: string
    to: string
    globOptions: {
      [key: string]: any
    }
    noErrorOnMissing: boolean
  },
): Bud.Contract {
  this.extensions
    .get(`copy-webpack-plugin`)
    .mutate('patterns', patterns => [
      ...patterns,
      {
        from,
        context: context ?? this.src(),
        to: to ?? this.distPath(),
        globOptions: globOptions ?? {
          ignore: '.*',
        },
        noErrorOnMissing: true,
      },
    ])

  return this
}
