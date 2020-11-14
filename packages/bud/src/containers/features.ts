import {Container} from '@roots/bud-typings'

/**
 * Build cache
 */
export const buildCache = false

/**
 * Clean build directory before each run.
 */
export const clean = true

/**
 * Create manifest.json
 */
export const manifest = true

/**
 * Generate sourcemaps
 */
export const devtool = false

/**
 * Generate HTML template
 */
export const html = false

/**
 * Compress with Brotli
 */
export const brotli = false

/**
 * Compress with Gzip
 */
export const gzip = false

/**
 * Hash filenames
 */
export const hash = false

/**
 * Minify
 */
export const minify = false

/**
 * Proxy server
 */
export const proxy = false

/**
 * Separate vendored code from app code.
 */
export const splitChunks = false

/**
 * Separate runtime chunk.
 */
export const runtimeChunk = false

/**
 * Enabled features
 */
export type Features = Container
