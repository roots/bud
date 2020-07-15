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
const typescript = function (options) {
  this.features.typescript = options.enabled
    ? options.enabled
    : true

  this.options.typescript = {
    ...this.options.typescript,
    ...options.config,
  }

  return this
}

export {typescript}
