export interface repository {
  cache: {
    hash: null
  }
  cli: {
    args: any
    argv: Array<string>
    flags: Record<string, any>
    metadata: Record<string, any>
    raw: Array<Record<string, string>>
  }
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

  /**
   * @see webpack.cache.buildDependencies
   */
  dependencies: Array<string>
}

/**
 * Project repository
 *
 * @public
 */
export const repository: repository = {
  cache: {
    hash: null,
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
  cli: {
    args: {},
    argv: [],
    flags: {},
    metadata: {},
    raw: [],
  },
  manifestPath: null,
  manifest: {},
  installed: {},
  dependencies: [],
}
