import type {Features} from './types'
import {configs} from './configs'

/**
 * Features
 */
const features: Features = {
  /**
   * Enabled by default
   */
  babel: true,
  dashboard: true,
  js: true,

  /**
   * Enabled by config presence
   */
  eslint: configs.eslint ? true : false,
  postCss: configs.postCss ? true : false,
  typescript: configs.typescript ? true : false,

  /**
   * Opt-in
   */
  browserSync: false,
  css: false,
  debug: false,
  dependencyManifest: false,
  dump: false,
  font: false,
  image: false,
  manifest: false,
  svg: false,
  terser: false,
  hash: false,
  hot: false,
  inlineManifest: false,
  minify: false,
  overlay: false,
  scss: false,
  cssModules: false,
  scssModules: false,
  purge: false,
  sourceMap: false,
  splitting: false,
  translate: false,
  uglify: false,
  vendor: false,
  watch: false,
}

export {features}
