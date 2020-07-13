/**
 * Automatically load modules instead of needing to import them.
 */
export type auto = (
  arg0: {
    [key: string]: any
  },
  arg1: string[],
) => {
  bud: typeof import('./../index')
}
/**
 * Automatically load modules instead of needing to import them.
 * @example bud.auto({jquery: ['$', 'window.jQuery']})
 * @typedef {function ({[key: string]: modules: string[]}) => {bud: typeof import('./../index')}} auto
 * @param   {{[key: string]: {modules: string[]}}} options
 * @return  {typeof import('./../index')} bud */
export function auto(options: {
  [key: string]: {
    modules: string[]
  }
}): typeof import('./../index')
//# sourceMappingURL=auto.d.ts.map
