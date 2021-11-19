/**
 * The {@link @roots/bud-compiler# | @roots/bud-compiler} package implements the
 * {@link @roots/bud-framework#Compiler | Compiler interface}
 *
 * @see https://roots.io/bud
 * @see https://github.com/roots/bud
 *
 * @core @packageDocumentation @betaDocumentation
 */

import {Compiler as Compiler_2} from '@roots/bud-framework'
import {Compiler as Compiler_3} from 'webpack'
import {Service} from '@roots/bud-framework'
import {StatsCompilation} from 'webpack'

/**
 * Wepback compilation controller class
 *
 * @public
 */
export declare class Compiler
  extends Service
  implements Compiler_2
{
  /**
   * {@inheritDoc @roots/bud-framework#Service.name}
   *
   * @public
   */
  name: string
  /**
   * Compiler instance
   *
   * @public
   */
  instance: Compiler_2.Instance
  /**
   * Compilation stats
   *
   * @public
   */
  stats: StatsCompilation
  /**
   * Compilation progress
   *
   * @public
   */
  progress: Compiler_2.Progress
  /**
   * True if compiler is already instantiated
   *
   * @public
   */
  isCompiled: boolean
  /**
   * {@inheritDoc @roots/bud-framework#Service.register}
   *
   * @public
   * @decorator `@bind`
   */
  register(): void
  /**
   * Initiates compilation
   *
   * @returns the compiler instance
   *
   * @public
   * @decorator `@bind`
   */
  compile(): Compiler_2.Instance
  /**
   * Returns final webpack configuration
   *
   * @public
   * @decorator `@bind`
   */
  before(): any[]
  /**
   * @public
   * @decorator `@bind`
   */
  setup(config: any): Compiler_3
  /**
   * Compilation callback
   *
   * @public
   * @decorator `@bind`
   */
  callback(...args: any[]): void
}

export {}
