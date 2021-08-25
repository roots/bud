import {
  Cache as Contract,
  Framework,
  Service,
} from '@roots/bud-framework'
declare class Cache extends Service implements Contract {
  name: string
  register(app: Framework): void
  booted(): void
  /**
   * Returns sha1 hash as a version string
   */
  version(): string
  /**
   * Returns cache directory for fs operations
   */
  directory(): string
  /**
   * Returns array of build dependency paths
   *
   * @see [webpack cache.buildDependencies docs](https://webpack.js.org/configuration/cache/#cachebuilddependencies)
   */
  buildDependencies(): string[]
  /**
   * Returns hash of all build dependencies and parsed CLI arguments
   */
  hash(): string
}
export {Cache}
//# sourceMappingURL=index.d.ts.map
