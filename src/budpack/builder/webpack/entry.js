/**
 * Entrypoints
 *
 * @param {object} entry
 * @return {typeof import('webpack').entry} entry
 */
const entry = ({entry}) => ({
  entry: {
    ...entry,
  },
})

export {entry}
