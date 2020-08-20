const features = {
  dashboard: true, // bud custom dashboard.
  clean: true, // clean compiled files on every run.
  image: true, // img loader support
  font: true, // font loader support
  manifest: true, // generate a manifest
  optimize: true, // run optimization config
  terser: true, // enable terser
  vendor: true, // separate node_modules code from project code
  splitting: true, // enable code splitting
  minify: true, // enable minification
  postCss: true, // enable postCss

  /**
   * Opt-in
   */
  browserSync: false, // browsersync browser reloading
  dependencyManifest: false, // @wordpress webpack dependency manifest
  dump: false, // dump config
  hash: false, // hash filenames
  hot: false, // enable HMR
  inlineManifest: false, // generate a runtime manifest (runtimeChunk)
  overlay: false, // enable WDS/BS browser overlay
  sourceMap: false, // generate source maps
  translate: false, // generate i18n translation files
  uglify: false, // uglify (disables terser)
  watch: false, // watch mode
  debug: false, // debug mode
}

export {features}
