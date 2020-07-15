/**
 * Configure Typescript.
 *
 * If you prefer, you may utilize a tsconfig.js file in the project root,
 * either alongside or in lieue of this configuration.
 *
 * Conflicts between supplied configs will be resolved in favor of bud.config.js.
 */
export type typescript = (arg0: {
  enabled: boolean
  config: object
}) => {
  bud: typeof import('./../index')
}
/**
 * Configure Typescript.
 *
 * If you prefer, you may utilize a tsconfig.js file in the project root,
 * either alongside or in lieue of this configuration.
 *
 * Conflicts between supplied configs will be resolved in favor of bud.config.js.
 *
 * @typedef {function ({enabled: boolean, config: object}) => {bud: typeof import('./../index')}} typescript
 * @param   {{enabled: boolean, config: object}} options
 * @param   {boolean} options.enabled
 * @param   {object} options.typescript
 * @return  {typeof import('./../index')} bud
 */
export function typescript(options: {
  enabled: boolean
  config: object
}): typeof import('./../index')
//# sourceMappingURL=typescript.d.ts.map
