const features = {
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
   * Opt-in
   */
  react: false,
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
  debug: false, // debug mode
}

export {features}
