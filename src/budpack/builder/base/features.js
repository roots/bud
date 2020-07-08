import {inProduction} from './mode'

/**
 * Features
 *
 * @typedef  {object}  features
 * @property {boolean} babel          - babel enabled
 * @property {boolean} browserSync    - browserSync enabled
 * @property {boolean} debug          - debug enabled
 * @property {boolean} eslint         - eslint enabled
 * @property {boolean} hot            - HMR enabled
 * @property {boolean} hash           - file hashing enabled
 * @property {boolean} inlineManifest - inline manifest enabled
 * @property {boolean} minified       - minification enabled
 * @property {boolean} potCss         - postCss enabled
 * @property {boolean} purge          - purgeCss enabled
 * @property {boolean} sourceMap      - source-maps enabled
 * @property {boolean} translate      - translate enabled
 * @property {boolean} vendor         - vendor splitting enabled
 * @property {boolean} watch          - watch mode enabled
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
