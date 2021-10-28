import {Cache} from '../Cache'
import {
  bind,
  globby,
  Peers,
  Project as FrameworkProject,
  readJson,
} from './project.dependencies'
import type {Repository} from './project.interface'

/**
 * Project service class
 *
 * @public
 */
export class Project
  extends FrameworkProject.Abstract
  implements FrameworkProject.Interface
{
  /**
   * Project package.json location
   *
   * @public
   */
  public manifestPath: string

  /**
   * Project peer dependencies manager
   *
   * @public
   */
  public peers: Peers

  /**
   * Project repository
   *
   * @public
   */
  public repository: Repository = {
    version: null,
    cacheDirectory: null,
    cache: {
      file: null,
      directory: null,
    },
    configs: {
      dynamic: {
        global: null,
        conditional: null,
      },
      json: {
        global: null,
        conditional: null,
      },
    },
    manifestPath: null,
    peers: {},
    extensions: {},
    manifest: {},
    resolve: [],
    dependencies: [],
  }

  @bind
  public async register(): Promise<void> {
    this.set(
      'manifestPath',
      this.app.path('project', 'package.json'),
    )

    try {
      const manifest = await readJson(this.get('manifestPath'))
      this.set('manifest', manifest)
      Object.entries(manifest).forEach(([k, v]) => {
        this.app.log(`project manifest ${k} set as`, typeof v)
      })
    } catch (e) {
      return this.app.error('manifest file not found')
    }

    if (this.has('manifest.bud.cacheDirectory')) {
      this.app.setPath({
        storage: this.get('manifest.bud.cacheDirectory'),
      })
    }

    this.mergeStore({
      cache: {
        directory: this.app.path('storage'),
        file: this.app.path(
          'storage',
          `/${this.app.name}.profile.json`,
        ),
      },
    })

    /**
     * Always applicable dynamic
     */
    const globalConfigPaths = await globby.globby(
      this.app.path(
        'project',
        `${this.app.name}.config.{js,ts}`,
      ),
    )
    if (globalConfigPaths.filter(Boolean).length) {
      const globalConfigs = await this.resolveConfigModules(
        globalConfigPaths.filter(Boolean),
      )
      this.set('configs.dynamic.global', globalConfigs)
    }

    /**
     * Conditional dynamic
     */
    const conditionalPaths = await globby.globby(
      this.app.path(
        'project',
        `${this.app.name}.${this.app.mode}.config.{js,ts}`,
      ),
    )
    if (conditionalPaths.filter(Boolean).length) {
      const conditional = await this.resolveConfigModules(
        conditionalPaths,
      )
      this.set('configs.dynamic.conditional', conditional)
    } else {
      this.app.log('no conditional paths')
    }

    /**
     * Always applicable static
     */
    const globalStaticPaths = await globby.globby(
      this.app.path(
        'project',
        `${this.app.name}.config.{json,yml}`,
      ),
    )
    const globalStaticModules = await this.resolveConfigModules(
      globalStaticPaths,
    )
    this.set('configs.json.global', globalStaticModules)

    /**
     * Conditional static
     */
    const conditionalStaticPaths = await globby.globby(
      this.app.path(
        'project',
        `${this.app.name}.${this.app.mode}.config.{json,yml}`,
      ),
    )
    if (conditionalStaticPaths.filter(Boolean).length) {
      const conditionalStaticModules =
        await this.resolveConfigModules(conditionalStaticPaths)
      this.set(
        'configs.json.conditional',
        conditionalStaticModules,
      )
    } else {
      this.app.log('no conditional static paths')
    }

    const hash = await Cache.version(this.get('dependencies'))
    this.app.success(`project hash: ${hash}`)
    this.app.project.set('version', hash)
  }

  public boot() {
    if (this.app.cache.valid) {
      this.setStore(this.app.cache.all())
    }

    this.app.log(
      'cached project data flagged as invalid or inaccessible and must be rebuilt',
    )

    this.findPeers()

    this.app.cache.write(async cache => ({
      ...cache,
      ...this.all(),
    }))
  }

  @bind
  public async resolveConfigModules(
    paths: string[],
  ): Promise<Record<string, {path: string; module: any}>> {
    return await paths.reduce(async (p, f) => {
      await p

      const c = await import(f)

      const path = f.replace(
        this.app.path('project').concat('/'),
        '',
      )
      this.app.info(`${path} is resolvable`)
      this.set('dependencies', [
        ...(this.get('dependencies') ?? []),
        f,
      ])
      return {
        ...p,
        [path]: {
          path: f,
          module: c,
        },
      }
    }, Promise.resolve({}))
  }

  /**
   * Returns all gathered project data
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public getProjectInfo(): {[key: string]: any} {
    return this.all()
  }

  /**
   * Read project package.json and set peer deps
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public findPeers(): void {
    this.app.log('Analyzing peers')
    this.peers = new Peers(this)
  }

  /**
   * Returns true if a dependency is listed in the project manifest
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public hasPeerDependency(pkg: string): boolean {
    return this.has(`peers.${pkg}`)
  }
}
