import {Framework} from '@roots/bud-framework'

type Provide = (
  this: Framework,
  packages?: {
    [key: string]: string | string[]
  },
) => Framework

declare module '@roots/bud-framework' {
  export interface Framework {
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
    provide: Provide
  }
}

export const provide: Provide = function (packages) {
  const op = this.extensions
    .get('webpack-provide-plugin')
    .has('options')
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
