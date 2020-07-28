import type {Features} from './types'
import {configs} from './configs'

/**
 * Features
 */
const features: Features = {
  /**
   * Enabled by default
   */
  dashboard: true,
  clean: true,
  css: true,
  svg: true,
  image: true,
  font: true,
  js: true,
  manifest: true,
  optimize: true,
  terser: true,
  vendor: true,
  splitting: true,

  /**
   * Enabled by config presence
   */
  babel: configs.babel ? true : false,
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
  translate: false,
  uglify: false,
  watch: false,
}

export {features}
