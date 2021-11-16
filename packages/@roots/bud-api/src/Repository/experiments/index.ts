import type {Framework} from '@roots/bud-framework'
import type {Configuration} from 'webpack'

/**
 * @hook build.experiments
 *
 * @public @config
 */
export interface experiments {
  (
    key: keyof Configuration['experiments'],
    setting: boolean,
  ): Promise<Framework>
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
export const experiments: experiments = async function (
  key,
  setting,
): Promise<Framework> {
  this as Framework

  await this.hooks.promise(
    'build.experiments',
    async experiments => {
      if (experiments) {
        const current = await experiments
        return {
          ...(current ?? {}),
          [key]: setting,
        }
      }

      return {
        [key]: setting,
      }
    },
  )

  return this
}
