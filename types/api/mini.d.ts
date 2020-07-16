/**
 * Enable or disable minification
 */
export type mini = (
  arg0: any,
  arg1: boolean,
) => {
  bud: typeof import('./../index')
}
/**
 * Enable or disable minification
 *
 * @typedef {function (enable: boolean) => {bud: typeof import('./../index')}} mini
 * @param  {boolean} enable - true to enable CSS/JS minification.
 * @return {typeof import('./../index')} bud
 */
export function mini(
  enable: boolean,
): typeof import('./../index')
//# sourceMappingURL=mini.d.ts.map
