import {Framework} from '@roots/bud-framework'

import {readJson} from './project.dependencies'
import {Project} from './project.interface'

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
  unmet: [],
  peers: {},
  extensions: {},
  resolve: [],
  dependencies: [],
}

/**
 * @public
 */
export async function initializeStore(this: Project.Interface) {
  this.setStore({
    ...repository,
    cli: this.app.store.get('cli'),
    env: {
      public: this.app.env.getPublicEnv(),
      all: this.app.env.all(),
    },
    manifestPath: this.app.path('project', 'package.json'),
    dependencies: [this.app.path('project', 'package.json')],
  })

  try {
    const manifest = await readJson(this.get('manifestPath'))
    this.set('manifest', manifest)
  } catch (e) {
    this.log('error', 'manifest file not found', e)
  }

  this.app
    .when(
      this.has(`manifest.${this.app.name}.inject`),
      ({store}) =>
        store.set(
          'inject',
          this.get(`manifest.${this.app.name}.inject`),
        ),
    )
    .when(this.has(`manifest.${this.app.name}.paths`), () =>
      this.app.store.merge(
        'location',
        this.get(`manifest.${this.app.name}.paths`),
      ),
    )

  this.set('installed', {
    ...(this.get('manifest.devDependencies') ?? {}),
    ...(this.get('manifest.dependencies') ?? {}),
  })
}
