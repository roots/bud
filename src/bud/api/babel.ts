import { Bud, Babel, BabelProperties } from "./types";

/**
 * ## bud.babel
 *
 * Configure Babel.
 *
 * If you prefer, you may utilize a babel.config.js file in the project root,
 * either alongside or in lieue of this configuration.
 *
 * Conflicts between supplied configs will be resolved in favor of bud.config.js.
 *
 * @see https://babeljs.io/docs/en/configuration
 */
const babel: Babel = function (this: Bud, options: BabelProperties): Bud {
  this.state.features.babel = true;
  this.state.options.babel = {
    ...this.state.options.babel,
    ...options,
  };

  return this;
};

export { babel };
