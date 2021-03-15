import {Framework} from '@roots/bud-framework'

type Externals = (
  this: Framework,
  externals: {
    [key: string]: any
  },
) => Framework

declare module '@roots/bud-framework' {
  interface Framework {
    /**
     * ## bud.externals  [💁 Fluent]
     *
     * Specify a non-standard resolution strategy for modules
     * with a matching name.
     *
     * ### Usage
     *
     * ```js
     * bud.externals({
     *   'jQuery': 'window.jquery',
     * })
     */
    externals: Externals
  }
}

export const externals: Externals = function (externals) {
  this.publish(
    {
      'build/externals': value => ({
        ...value,
        ...externals,
      }),
    },
    'api/externals',
  )

  return this
}
