import {Service} from '@roots/bud-framework'
import crypto from 'crypto'
import {readFileSync, mkdirSync, pathExistsSync} from 'fs-extra'
import {boundMethod as bind} from 'autobind-decorator'
import {sync} from 'globby'

class Cache extends Service {
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

  public get version() {
    const conf =
      JSON.stringify(
        sync(
          this.app.path('project', `\.?${this.app.name}*`),
        ).reduce(
          (a: string, c: string) =>
            `${a}${readFileSync(c, 'utf8')}`,
          '',
        ),
      ) ?? ''

    return crypto
      .createHash('md4')
      .update(`${conf}${this.json}`)
      .digest('hex')
  }

  public get json() {
    return pathExistsSync(
      this.app.path('project', 'package.json'),
    )
      ? JSON.stringify(
          readFileSync(
            this.app.path('project', 'package.json'),
            'utf8',
          ) ?? '',
        )
      : `{}`
  }
}

export {Cache}
