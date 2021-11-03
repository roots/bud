/**
 * Project repository
 *
 * @public
 */
export const repository = {
  version: null,
  cache: {
    file: null,
    directory: null,
  },
  configs: {
    dynamic: {
      global: [],
      conditional: [],
    },
    json: {
      global: [],
      conditional: [],
    },
  },
  manifestPath: null,
  manifest: {},
  installed: [],
  peers: {},
  extensions: {},
  resolve: [],
  dependencies: [],
}
