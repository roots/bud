import {Framework} from '@roots/bud-framework'

declare module '@roots/bud-framework' {
  interface Framework<T> {
    /**
     * ## bud.provide  [💁 Fluent]
     *
     * Makes a variable/module available throughout the entire
     * application without needing to import it explicitly.
     *
     * ### Usage
     *
     * ```js
     * bud.provide({
     *   jquery: '$',
     * })
     * ```
     */
    provide: Framework.Api.Provide
  }

  namespace Framework.Api {
    export type Provide = (
      this: Framework,
      packages?: {
        [key: string]: string | string[]
      },
    ) => Framework
  }
}

export const provide: Framework.Api.Provide = function (
  packages,
) {
  const op = this.extensions.get(
    'webpack-provide-plugin'
  ).has('options')
    ? 'merge'
    : 'set'

  this.extensions.get('webpack-provide-plugin')[op](
    'options',
    Object.entries(packages).reduce(
      (a, [k, v]) => ({
        ...a,
        ...(!Array.isArray(v)
          ? {[v]: k}
          : {
              ...a,
              ...v.reduce(
                (a, pkg) => ({
                  ...a,
                  [pkg]: k,
                }),
                {},
              ),
            }),
      }),
      {},
    ),
  )

  return this
}
