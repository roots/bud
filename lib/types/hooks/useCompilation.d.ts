import { Stats } from 'webpack';
import type Server from '@roots/bud-server';
import type Compiler from '@roots/bud-compiler';
export interface Compilation {
    /**
     * All stats data
     */
    stats?: Stats.ToJsonOutput;
    /**
     * Formatted error messages
     */
    errors?: Stats.ToJsonOutput['errors'];
    /**
     * Formatted warning messages
     */
    warnings?: Stats.ToJsonOutput['warnings'];
    /**
     * Compile progress
     */
    progress: {
        percentage: number;
        msg: string;
    };
    /**
     * Is server listening?
     */
    listening: boolean;
    /**
     * Is server running?
     */
    running: boolean;
    /**
     * Is compiler in watch mode?
     */
    watching: boolean;
}
export interface CompileSources {
    compiler: Compiler;
    server: Server;
}
export interface UseCompilation {
    (props: CompileSources): Compilation;
}
declare const useCompilation: UseCompilation;
export { useCompilation as default };
