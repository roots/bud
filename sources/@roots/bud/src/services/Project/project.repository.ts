export interface repository {
  version: string
  configs: {
    dynamic: {
      global?: Array<string>
      conditional?: Array<string>
    }
    json: {
      global: Array<Record<string, any>>
      conditional: Array<Record<string, any>>
    }
  }
  manifestPath: string
  manifest: Record<string, any>
  installed: Record<string, string>
  dependencies: Array<string>
}

/**
 * Project repository
 *
 * @public
 */
export const repository: repository = {
  version: null,
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
  installed: {},
  dependencies: [],
}
