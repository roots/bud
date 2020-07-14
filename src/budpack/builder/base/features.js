import {inProduction} from './mode'

/**
 * Features
 *
 * @typedef  {object}  features
 * @property {boolean} features.babel - babel enabled
 * @property {boolean} features.browserSync    - browserSync enabled
 * @property {boolean} features.dashboard      - dashboard enabled
 * @property {boolean} features.debug          - debug enabled
 * @property {boolean} features.eslint         - eslint enabled
 * @property {boolean} features.hot            - HMR enabled
 * @property {boolean} features.hash           - file hashing enabled
 * @property {boolean} features.inlineManifest - inline manifest enabled
 * @property {boolean} features.minified       - minification enabled
 * @property {boolean} features.potCss         - postCss enabled
 * @property {boolean} features.purge          - purgeCss enabled
 * @property {boolean} features.sourceMap      - source-maps enabled
 * @property {boolean} features.translate      - translate enabled
 * @property {boolean} features.vendor         - vendor splitting enabled
 * @property {boolean} features.watch          - watch mode enabled
 */

const features = {
  babel: true,
  browserSync: !inProduction,
  debug: false,
  dashboard: true,
  dependencyManifest: false,
  eslint: true,
  hash: inProduction,
  hot: !inProduction,
  inlineManifest: false,
  minified: inProduction,
  overlay: true,
  postCss: true,
  purge: false,
  sourceMap: !inProduction,
  splitting: true,
  translate: false,
  vendor: false,
  watch: !inProduction,
}

export {features}
