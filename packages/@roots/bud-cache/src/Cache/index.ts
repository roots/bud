import {Cache, Framework} from '@roots/bud-framework'
import {bind, fs, globby} from '@roots/bud-support'
import {createHash} from 'crypto'

const {readFileSync} = fs

/**
 * Service class handling cache concerns
 *
 * @remarks
 * Interfaces with:
 *  - {@link @roots/bud-framework#Project} to determine project dependencies for snapshotting/validation.
 *  - {@link @roots/bud-framework#Build} via {@link @roots/bud-framework#Hooks} to update config.
 *
 * Facades:
 *  - {@link @roots/bud-framework#Api} can toggle cache settings with {@link Bud.Persist}
 *
 * @public
 */
export default class
  extends Cache.Abstract
  implements Cache.Interface
{
  /**
   * {@inheritDoc}
   */
  public name = 'cache'

  /**
   * {@inheritDoc}
   *
   * @decorator `@bind`
   */
  @bind
  public register(app: Framework): void {
    app.hooks
      .on('build/cache', () => ({
        type: app.hooks.filter('build/cache/type'),
      }))
      .hooks.on('build/cache/type', () => 'memory')
  }

  /**
   * Returns sha1 hash as a version string
   *
   * @decorator `@bind`
   */
  @bind
  public version(): string {
    return createHash('sha1')
      .update(this.hash())
      .digest('base64')
      .replace(/[^a-z0-9]/gi, '_')
      .toLowerCase()
  }

  /**
   * Returns cache storage directory
   *
   * @decorator `@bind`
   */
  @bind
  public directory(): string {
    return this.app.path('storage', 'cache')
  }

  /**
   * Returns array of build dependency paths
   *
   * @remarks
   * @see https://webpack.js.org/configuration/cache/#cachebuilddependencies
   *
   * @decorator `@bind`
   */
  @bind
  public buildDependencies(): string[] {
    return [
      ...new Set(
        globby.globbySync([
          this.app.path(
            'project',
            `${this.app.name}.{js,ts,yml,json}`,
          ),

          this.app.path(
            'project',
            `${this.app.name}.config.{js,ts,yml,json}`,
          ),

          this.app.path(
            'project',
            `${this.app.name}.${this.app.mode}.{js,ts.yml,json}`,
          ),

          ...(this.app.project?.resolveFrom?.map(
            dep => `${dep}/lib/cjs/index.js`,
          ) ??
            this.app.parent?.project?.resolveFrom?.map(
              dep => `${dep}/lib/cjs/index.js`,
            ) ??
            []),
          this.app.path('storage', 'cache/*'),
        ]),
      ),
    ] as string[]
  }

  /**
   * Returns hash of all build dependencies and parsed CLI arguments
   *
   * @decorator `@bind`
   */
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
