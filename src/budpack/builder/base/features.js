import {inProduction} from '../mode'

/**
 * Features
 *
 * @typedef  {Object.<features>} features
 * @property {boolean}           debug      - true if debug enabled
 * @property {boolean}           watching   - true if watch mode enabled
 * @property {boolean}           hot        - true if HMR enabled
 * @property {boolean}           hashed     - true if file hashing enabled
 * @property {boolean}           minified   - true if minification enabled
 * @property {boolean}           vendor     - true if vendor splitting enabled
 * @property {boolean}           wpManifest - true if @wordpress/webpack-dependency-extraction-plugin enabled
 */
 const features = {
  babel: true,
  browserSync: !inProduction,
  debug: false,
  dependencyManifest: true,
  eslint: true,
  hash: inProduction,
  hot: !inProduction,
  inlineManifest: false,
  minified: inProduction,
  postCss: true,
  purge: inProduction,
  sourceMap: !inProduction,
  splitting: true,
  translate: false,
  vendor: true,
  watch: !inProduction,
}

export {features}
