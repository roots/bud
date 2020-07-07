/**
 * Compile a group of assets.
 */
export type bundle = (
  arg0: never,
  arg1: {
    string
  },
  arg2: any,
  arg3: {
    string
  }[],
) => {
  bud: import('./../index')
}
/**
 * Compile a group of assets.
 * @example bud.bundle('app', [bud.src('app.js'), bud.src('app.css')])
 * @typedef {function (name: {string}, entries: {string}[]) => {bud: import('./../index')}} bundle
 * @param   {string} name - output name.
 * @param   {array}  entries - array of src assets to include in the bundle.
 * @return  {import('./../index')} bud
 */
export function bundle(
  name: string,
  entries: any[],
): import('./../index')
//# sourceMappingURL=bundle.d.ts.map
