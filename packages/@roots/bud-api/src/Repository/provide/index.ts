import type {Framework} from '@roots/bud-framework'

/**
 * Package/definition mappings
 *
 * @public @config
 */
interface mappedPackages {
  [key: string]: string | string[]
}

/**
 * Wrapper function for {@link webpack#ProvidePlugin}.
 *
 * @public @config
 */
interface provide {
  (this: Framework, packages?: mappedPackages): Framework
}

/**
 * Make a variable/module available throughout the entire
 * application without needing to import it explicitly.
 *
 * @example
 * ```js
 * bud.provide({
 *   jquery: '$',
 * })
 * ```
 *
 * @public @config
 */
const provide: provide = function (
  this: Framework,
  packages: mappedPackages,
) {
  this.extensions
    .get('webpack-provide-plugin')
    .options.setStore(mappedPackagesReducer.bind(packages))

  return this
}

/**
 * Callback for the {@link @roots/bud-hooks#on} event property
 *
 * @param this - {@link mappedPackages} already registered to plugin options
 * @param provided - {@link mappedPackages} to merged into {@link this}
 *
 * @hook extension/webpack-provide-plugin/options
 *
 * @internal
 */
function mappedPackagesReducer(
  this: mappedPackages,
  provided: mappedPackages,
) {
  return {
    ...provided,
    ...Object.entries(this).reduce(
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
  }
}

export {provide as default}
