const features = {
  repository: 'features',
  contents: {
    /**
     * Default enabled
     */
    babel: true, // enable babel
    clean: true, // clean compiled files on every run.
    dashboard: true, // bud custom dashboard.
    manifest: true, // generate a manifest
    postcss: true, // enable postCss

    /**
     * Opt-in
     */
    browsersync: false, // browsersync browser reloading
    hash: false, // hash filenames
    hot: false, // enable devServer: hot module reloading
    minify: false, // enable optimization: minify
    splitting: true, // enable code splitting
    vendor: false, // separate node_modules code from project code
    runtimeChunk: false, // generate a runtime manifest (runtimeChunk)
    overlay: false, // enable WDS/BS browser overlay
    sourceMap: false, // generate source maps
    watch: false, // watch mode
    debug: false, // debug mode
  },
}

export {features}
