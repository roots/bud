import {inProduction} from './../mode'

/**
 * Features
 */
const features: Features = {
  babel: true,
  browserSync: !inProduction,
  debug: false,
  dashboard: true,
  dependencyManifest: false,
  dump: false,
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
  typescript: true,
  vendor: false,
  watch: !inProduction,
}

export {features}
import type {Features} from '.'
