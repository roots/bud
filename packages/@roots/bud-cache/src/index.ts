import {Service, Cache as Base} from '@roots/bud-framework'
import crypto from 'crypto'
import {mkdirSync, pathExistsSync, readFileSync} from 'fs-extra'
import {boundMethod as bind} from 'autobind-decorator'
import {sync} from 'globby'
import {isEqual} from 'lodash'

class Cache extends Service implements Base {
  public name = '@roots/bud-cache'

  public cacheFiles: string[] = []

  @bind
  public register(): void {
    this.app.hooks.on('build', config => {
      if (isEqual(config.cache.type, 'memory')) {
        config.cache = {
          type: 'memory',
        }
      }

      return config
    })

    this.app.hooks
      .on('build/cache/name', () => undefined)
      .hooks.on('build/cache/version', () => undefined)
      .hooks.on('build/cache/type', () => 'memory')
      .hooks.on('build/cache/cacheDirectory', () => undefined)
      .hooks.on('build/cache/cacheLocation', () => undefined)
      .hooks.on('build/cache/buildDependencies', undefined)
      .hooks.on('build/cache/managedPaths', () => undefined)
  }

  @bind
  public booted(): void {
    this.app.hooks.filter('build/cache/type') === 'filesystem' &&
      !pathExistsSync(this.app.path('storage')) &&
      mkdirSync(this.app.path('storage'))
  }

  @bind
  public version(): string {
    return crypto
      .createHash('md4')
      .update(this.hash())
      .digest('hex')
  }

  @bind
  public directory(): string {
    return this.app.path('storage', 'cache')
  }

  @bind
  public buildDependencies(): string[] {
    return sync([
      this.app.path('project', 'package.json'),
      this.app.path(
        'project',
        `${this.app.name}.{js,ts,yml,json}`,
      ),
      this.app.path(
        'project',
        `${this.app.name}.${this.app.mode}.{js,ts.yml,json}`,
      ),
      ...this.app.discovery.resolveFrom.map(
        dep => `${dep}/lib/cjs/index.js`,
      ),
      ...this.app.discovery.resolveFrom.map(
        dep => `${dep}/package.json`,
      ),
      ...this.cacheFiles,
      this.app.path('storage', 'cache/*'),
    ])
  }

  @bind
  public hash(): string {
    return JSON.stringify(
      this.buildDependencies().reduce(
        (all, file) => all.concat(readFileSync(file, 'utf8')),
        process.argv.slice(3).join(''),
      ) ?? '{}',
    )
  }
}

export {Cache}
