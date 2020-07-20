/**
 * ## bud.dashboard
 *
 * Enable or disable Bud's CLI build output.
 *
 * ## Example
 *
 * ```js
 * bud.dashboard(false) // disable dashboard
 * ```
 *
 * @param   {boolean} enabled - true to enable debug mode
 * @return  {typeof import('./../index')} bud
 */
export function dashboard(enabled: boolean): typeof import('./../index');
