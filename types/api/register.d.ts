/**
 * ## bud.register
 *
 * Register a Bud plugin
 *
 * ```js
 * bud.register('myPlugin', myPlugin)
 * ```
 */
export type register = (
  arg0: never,
  arg1: string,
  arg2: any,
  arg3: Function,
) => {
  bud: typeof import('./../index')
}
/**
 * ## bud.register
 *
 * Register a Bud plugin
 *
 * ```js
 * bud.register('myPlugin', myPlugin)
 * ```
 *
 * @typedef {function (name: string, plugin: function) => {bud: typeof import('./../index')}} register
 * @param   {boolean} enabled - true to enable hot module reloading. default: !bud.inProduction.
 * @return  {typeof import('./../index')} bud
 */
export function register(
  name: any,
  plugin: any,
): typeof import('./../index')
//# sourceMappingURL=register.d.ts.map
