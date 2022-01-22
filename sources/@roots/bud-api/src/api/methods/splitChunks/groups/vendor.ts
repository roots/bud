/**
 * Chunks to apply this grouping to
 *
 * @public
 */
export const chunks = 'all'

/**
 * Cache group test
 *
 * @remarks
 * Hot reload scripts, bud utilities, ansi parsers, loaders.. stuff
 * that probably has nothing to do with the app
 *
 * @public
 */
export const test: RegExp = /[\\/]node_modules[\\/]/

/**
 * vendor cache group name
 *
 * @remarks
 * in the format of `vendor/[chunk].[chunk].js`
 *
 * This is a webpack callback
 *
 * @public
 */
export const name = (
  _module: string,
  chunks: Array<{name: string}>,
  cacheGroupKey: string,
) =>
  chunks.reduce(
    (groupName, {name}) =>
      groupName.endsWith('/')
        ? `${groupName}${name}`
        : `${groupName}.${name}`,
    `${cacheGroupKey}/`,
  )

/**
 * Reuse existing chunk
 *
 * @public
 */
export const reuseExistingChunk = true

/**
 * Chunk priority
 *
 * @remarks
 * This should be higher than the vendor group but lower
 * than any user-made chunks (which should start at 0)
 *
 * @public
 */
export const priority = -20
