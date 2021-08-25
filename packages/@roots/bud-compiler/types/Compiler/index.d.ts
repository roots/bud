import {
  Compiler as Contract,
  Service,
} from '@roots/bud-framework'
import {StatsCompilation} from 'webpack'
/**
 * Webpack compilation controller
 */
interface Compiler extends Contract {}
declare class Compiler extends Service {
  /**
   * {@link Service} name
   */
  name: string
  /**
   * {@link Webpack} instance
   */
  instance: Contract.Instance
  /**
   * Compilation stats
   */
  stats: StatsCompilation
  /**
   * Compilation progress as reported by {@link ProgressPlugin}
   */
  progress: Contract.Progress
  /**
   * True if compiler is already instantiated
   */
  isCompiled: boolean
  /**
   * Lifecycle method: bootstrapped
   *
   * @remarks
   * Registers hooks filtered before and after
   * the instantiation of Webpack as well as one additional hook
   * which is filtered at the tail of the Webpack compiler callback.
   *
   * @decorator `@bind`
   */
  register(): void
  /**
   * Initiate webpack compilation process
   */
  compile(): Contract.Instance
  /**
   * Returns final webpack configuration
   */
  before(): any[]
  setup(config: any): import('webpack').Compiler
  /**
   * Webpack compilation callback
   */
  callback(...args: any[]): void
}
export {Compiler}
//# sourceMappingURL=index.d.ts.map
