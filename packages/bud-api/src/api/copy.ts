import {lodash as _} from '@roots/bud-support'
import {Bud} from '@roots/bud-typings'

export const copy: Copy = function (
  from,
  to = null,
  context = null,
  options = {
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
        to: to ?? this.dist(),
        context: context ?? this.src(),
        ...options,
      },
    ])

  return this
}

export namespace Copy {
  export interface Options {
    from: string
    to: string
    context: string
    options: {
      noErrorOnMissing: boolean
      globOptions: {
        ignore: string
      }
    }
  }
}

export type Copy<T = Bud.Contract> = (
  this: T,
  options: Copy.Options,
) => T
