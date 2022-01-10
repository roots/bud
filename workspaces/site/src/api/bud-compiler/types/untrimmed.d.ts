/**
 * The {@link @roots/bud-compiler# | @roots/bud-compiler} package implements the
 * {@link @roots/bud-framework#Compiler | Compiler interface}
 *
 * @see https://roots.io/bud
 * @see https://github.com/roots/bud
 *
 *  @packageDocumentation
 */

import { Compiler as Compiler_2 } from '@roots/bud-framework';
import { Compiler as Compiler_3 } from 'webpack';
import { Service } from '@roots/bud-framework';
import { StatsCompilation } from 'webpack';
import { StatsError } from 'webpack';

/**
 * Wepback compilation controller class
 *
 * @public
 */
export declare class Compiler extends Service implements Compiler_2 {
    /**
     * Compiler instance
     *
     * @public
     */
    instance: Compiler_2.Instance;
    /**
     * Compilation stats
     *
     * @public
     */
    stats: StatsCompilation;
    /**
     * Compiler errors
     */
    errors: Array<StatsError>;
    /**
     * Compilation progress
     *
     * @public
     */
    progress: Compiler_2.Progress;
    /**
     * True if compiler is already instantiated
     *
     * @public
     */
    isCompiled: boolean;
    /**
     * @public
     */
    config: any;
    /**
     * Initiates compilation
     *
     * @returns the compiler instance
     *
     * @public
     * @decorator `@bind`
     */
    compile(): Promise<Compiler_3>;
    /**
     * @public
     * @decorator `@bind`
     */
    invoke(config: any): Promise<Compiler_3>;
    /**
     * Returns final webpack configuration
     *
     * @public
     * @decorator `@bind`
     */
    before(): Promise<any[]>;
    /**
     * Compilation callback
     *
     * @public
     * @decorator `@bind`
     */
    callback(...args: any[]): void;
}

export { }
