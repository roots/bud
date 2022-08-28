export interface Flags {
  /**
   * Clean dist directory prior to compilation
   *
   * @public
   */
  'feature.clean': boolean

  /**
   * Hash emitted filenames
   *
   * @public
   */
  'feature.hash': boolean

  /**
   * Emit an html file during compilation
   *
   * @public
   */
  'feature.html': boolean

  /**
   * Automatically register installed extensions
   *
   * @public
   */
  'feature.inject': boolean

  /**
   * Log build status informatino to the terminal
   *
   * @public
   */
  'feature.log': boolean

  /**
   * Emit a manifest.json with references to emitted assets
   *
   * @public
   */
  'feature.manifest': boolean

  /**
   * @public
   */
  'feature.runtimeChunk': boolean

  /**
   * Enable code splitting
   *
   * @public
   */
  'feature.splitChunks': boolean
}
