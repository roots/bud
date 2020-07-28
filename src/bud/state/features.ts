import type {Features} from './types'
import {configs} from './configs'

/**
 * Features
 *
 * Many API methods will opt-in a project
 * based on usage. This is a nicer DX and is preferred.
 *
 * @see {Bud.Api.Features}
 *
 */
const features: Features = {
  /**
   * Enabled by default
   */
  dashboard: true, // bud custom dashboard.
  clean: true, // clean compiled files on every run.
  css: true, // css loader support
  svg: true, // svg loader support
  image: true, // img loader support
  font: true, // font loader support
  js: true, // js loader support
  manifest: true, // generate a manifest
  optimize: true, // run optimization config
  terser: true, // enable terser
  vendor: true, // separate node_modules code from project code
  splitting: true, // enable code splitting
  minify: true, // enable minification

  /**
   * Enabled by config presence
   */
  babel: configs.babel ? true : false, // babel.config.js
  eslint: configs.eslint ? true : false, // .eslintrc.js
  postCss: configs.postCss ? true : false, // postcss.config.js
  typescript: configs.typescript ? true : false, // tsconfig.json

  /**
   * Opt-in.
   */
  browserSync: false, // browsersync browser reloading
  dependencyManifest: false, // @wordpress webpack dependency manifest
  dump: false, // dump config
  hash: false, // hash filenames
  hot: false, // enable HMR
  inlineManifest: false, // generate a runtime manifest (runtimeChunk)
  overlay: false, // enable WDS/BS browser overlay
  scss: false, // enable scss
  cssModules: false, // enable css module support
  scssModules: false, // enable scss module support
  purge: false, // run purgecss (postcss plugin)
  sourceMap: false, // generate source maps
  translate: false, // generate i18n translation files
  uglify: false, // uglify (disables terser)
  watch: false, // watch mode

  /**
   * Deprecated
   */
  debug: false, // debug mode
}

export {features}
