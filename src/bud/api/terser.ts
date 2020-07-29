import type {Bud, Terser} from './types'

const terser: Terser = function (options: {
  enable?: boolean
  terser?: object
}): Bud {
  this.features.set('terser', options?.enable ?? true)

  this.options.merge('terser', {
    terserOptions: options?.terser ?? {
      parse: {
        ecma: 8,
      },
      compress: {
        ecma: 5,
        warnings: false,
        comparisons: false,
        inline: 2,
      },
      mangle: {
        safari10: true,
      },
      output: {
        ecma: 5,
        comments: false,
        ascii_only: true,
      },
    },
    cache: true,
    parallel: true,
    sourceMap: this.features.enabled('sourceMap')
  })

  return this
}

export {terser}
