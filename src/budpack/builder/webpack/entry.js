/**
 * Entrypoints
 *
 * @param {object} entry
 * @return {typeof import('webpack').entry} entry
 */
const entry = bud => ({
  entry: {
    ...bud.options.entry,
  },
})

export {entry}
