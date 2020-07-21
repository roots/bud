import {inProduction} from './mode'

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

export type Features = {
  babel: boolean
  browserSync: boolean
  debug: boolean
  dashboard: boolean
  dependencyManifest: boolean
  dump: boolean
  eslint: boolean
  hash: boolean
  hot: boolean
  inlineManifest: boolean
  minified: boolean
  overlay: boolean
  postCss: boolean
  purge: boolean
  sourceMap: boolean
  splitting: boolean
  translate: boolean
  typescript: boolean
  vendor: boolean
  watch: boolean
}
