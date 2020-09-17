const features = {
  babel: true, // enable babel
  clean: true, // clean compiled files on every run.
  manifest: true, // generate a manifest
  postcss: true, // enable postCss
  brotli: false, // brotli compression
  gzip: false, // gzip compression
  hash: false, // hash filenames
  hot: false, // enable devServer: hot module reloading
  minify: false, // enable optimization: minify
  splitChunks: false, // separate node_modules code from project code
  runtimeChunk: false, // generate a runtime manifest (runtimeChunk)
  overlay: false, // enable WDS/BS browser overlay
  watch: false, // watch mode
}

export {features as default}
