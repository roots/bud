/**
 * Automatically load modules instead of needing to import them.
 */
export type auto = (arg0: {
  [key: string]: {
    modules: string[]
  }
}) => {
  bud: import('./../index')
}
/**
 * Automatically load modules instead of needing to import them.
 * @example bud.auto({jquery: ['$', 'window.jQuery']})
 * @typedef {function ({[key: string]: {modules: string[]}}) => {bud: import('./../index')}} auto
 * @param   {{[key: string]: {modules: string[]}}} options
 * @return  {import('./../index')} bud
 */
export function auto(options: {
  [key: string]: {
    modules: string[]
  }
}): import('./../index')
//# sourceMappingURL=auto.d.ts.map
