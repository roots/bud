import {lodash as _} from '@roots/bud-support'
import {Bud} from '@roots/bud-typings'

export namespace Copy {
  export interface Options {
    from: string
    context: string
    to: string
    globOptions: {
      [key: string]: any
    }
    noErrorOnMissing: boolean
  }
}

export type Copy = (
  this: Bud.Contract,
  {from, context, to, globOptions}: Copy.Options,
) => Bud.Contract

export const copy: Copy = function ({
  from,
  context = null,
  to = null,
  globOptions = {
    ignore: '.*',
  },
}) {
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
