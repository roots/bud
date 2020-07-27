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
  css: true,
  dashboard: true,
  font: true,
  image: true,
  js: true,
  manifest: true,
  svg: true,

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
  debug: false,
  dependencyManifest: false,
  dump: false,
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
  terser: false,
  translate: false,
  uglify: false,
  vendor: false,
  watch: false,
}

export {features}
