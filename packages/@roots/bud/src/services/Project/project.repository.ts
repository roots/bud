import {Framework} from '@roots/bud-framework'

export interface repository {
  cache: {
    file: string
    directory: string
  }
  configs: {
    dynamic: {
      global?: {
        filepath: string
        config: (app: Framework) => Promise<any>
      }
      conditional?: {
        filepath: string
        config: (app: Framework) => Promise<any>
      }
    }
    json: {
      global?: {
        filepath: string
        config: Record<string, any>
      }
      conditional?: {
        filepath: string
        config: Record<string, any>
      }
    }
  }
  hash: null
  manifestPath: string
  manifest: Record<string, any>
  installed: Record<string, string>
  unmet: Record<string, string>
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
    file: null,
    directory: null,
  },
  configs: {
    dynamic: {},
    json: {},
  },
  hash: null,
  manifestPath: null,
  manifest: {},
  installed: {},
  unmet: {},
  peers: {},
  extensions: {},
  resolve: [],
  dependencies: [],
}
