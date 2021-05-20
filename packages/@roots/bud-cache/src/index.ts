import {Service, Cache as Base} from '@roots/bud-framework'
import crypto from 'crypto'
import {mkdirSync, pathExistsSync, readFileSync} from 'fs-extra'
import {boundMethod as bind} from 'autobind-decorator'
import {sync} from 'globby'
import filenamify from 'filenamify'

class Cache extends Service implements Base {
  public name = '@roots/bud-cache'

  @bind
  public booted() {
    this.enabled() &&
      !pathExistsSync(this.app.path('storage')) &&
      mkdirSync(this.app.path('storage'))
  }

  @bind
  public enabled(): boolean {
    return (
      this.app.store.isTrue('cache') &&
      this.app.hooks.filter('build/cache/type') === 'filesystem'
    )
  }

  public get version(): string {
    return crypto
      .createHash('md4')
      .update(this.projectHash)
      .digest('hex')
  }

  public get cacheName(): string {
    return filenamify(
      `${this.app.name}-${this.app.mode}-${process.argv
        .slice(3)
        .join('')}`,
      {replacement: '⁓'},
    )
  }

  public get buildDependencies(): string[] {
    return sync([
      this.app.path(
        'project',
        `${this.app.name}.{js,ts,yml,json}`,
      ),
      this.app.path(
        'project',
        `${this.app.name}.${this.app.mode}.{js,ts.yml,json}`,
      ),
      this.app.path('project', 'package.json'),
      ...this.app.discovery.resolveFrom.map(
        dep => `${dep}/lib/cjs/index.js`,
      ),
    ])
  }

  public get projectHash(): string {
    return JSON.stringify(
      this.buildDependencies.reduce(
        (all, file) => all.concat(readFileSync(file, 'utf8')),
        '',
      ) ?? '{}',
    )
  }
}

export {Cache}
