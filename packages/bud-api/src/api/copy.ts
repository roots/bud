import type {Framework} from '@roots/bud-typings'

export const copy: Copy = function (
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

export type Copy = (
  this: Framework,
  options: Copy.Options,
) => Framework
