import type {Framework} from '@roots/bud-framework'
import type {Configuration} from 'webpack'

/**
 * @hook build/experiments
 *
 * @public @config
 */
interface experiments {
  (
    this: Framework,
    settings: Configuration['experiments'],
  ): Framework
}

/**
 * Configure experimental webpack options.
 *
 * @example
 * ```js
 * bud.experiments({
 *  lazyCompilation: true,
 * })
 * ```
 *
 * @public @config
 */
const experiments: experiments = function (settings) {
  this.hooks.on('build/experiments', settings)

  return this
}

export {experiments as default}
