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
  this.publish(
    {
      ['extension/webpack-provide-plugin/options']: provided => ({
        ...provided,
        ...Object.entries(packages).reduce(
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
      }),
    },
    'api/provide',
  )

  return this
}
