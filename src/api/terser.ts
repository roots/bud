import type {Bud, Terser} from './types'

const terser: Terser = function (options: {enable?: boolean; terser?: object}): Bud {
  this.logger.info(
    {name: 'bud.api', function: 'bud.watch', ...options},
    `bud.watch called`,
  )

  this.features.set('terser', options?.enable ?? true)

  options?.terser && this.options.set('terser', options.terser)

  return this
}

export {terser}
