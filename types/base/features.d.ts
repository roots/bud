/**
 * Features
 */
export type features = {
  /**
   * - babel enabled
   */
  babel: boolean
  /**
   * - browserSync enabled
   */
  browserSync: boolean
  /**
   * - dashboard enabled
   */
  dashboard: boolean
  /**
   * - debug enabled
   */
  debug: boolean
  /**
   * - eslint enabled
   */
  eslint: boolean
  /**
   * - HMR enabled
   */
  hot: boolean
  /**
   * - file hashing enabled
   */
  hash: boolean
  /**
   * - inline manifest enabled
   */
  inlineManifest: boolean
  /**
   * - minification enabled
   */
  minified: boolean
  /**
   * - postCss enabled
   */
  potCss: boolean
  /**
   * - purgeCss enabled
   */
  purge: boolean
  /**
   * - source-maps enabled
   */
  sourceMap: boolean
  /**
   * - translate enabled
   */
  translate: boolean
  /**
   * - vendor splitting enabled
   */
  vendor: boolean
  /**
   * - watch mode enabled
   */
  watch: boolean
}
export namespace features {
  export const babel: boolean
  export const browserSync: boolean
  export const debug: boolean
  export const dashboard: boolean
  export const dependencyManifest: boolean
  export const eslint: boolean
  export {inProduction as hash}
  export const hot: boolean
  export const inlineManifest: boolean
  export {inProduction as minified}
  export const overlay: boolean
  export const postCss: boolean
  export const purge: boolean
  export const sourceMap: boolean
  export const splitting: boolean
  export const translate: boolean
  export const typescript: boolean
  export const vendor: boolean
  export const watch: boolean
}
import {inProduction} from './mode'
//# sourceMappingURL=features.d.ts.map
