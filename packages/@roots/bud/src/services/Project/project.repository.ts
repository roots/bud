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
  unmet: Array<string>
  peers: {
    [key: string]: {
      name: string
      version: string
    }
  }

  /**
   * Installed extensions
   */
  extensions: {
    [key: string]: {
      bud: {
        type: 'extension' | 'preset'
        peers: Array<string>
      }
      name: string
      version: string
      path: string
      devDependencies: Record<string, string>
      dependencies: Record<string, string>
    }
  }

  missingExtensions: Array<string>

  /**
   * @see webpack.resolve.modules
   */
  resolve: Array<string>

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
  unmet: [],
  peers: {},
  extensions: {},
  missingExtensions: [],
  resolve: [],
  dependencies: [],
}
