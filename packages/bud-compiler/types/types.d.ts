/// <reference types="webpack-dev-server" />
/**
 * Typings
 */
import type { Configuration, Stats } from 'webpack';
import type { WebpackConfig, WebpackDevServer } from '@roots/bud-typings';
export type { Configuration as WebpackConfig, Stats as WebpackStats, WebpackDevServer, };
export interface RunnerProps {
    bud: any;
}
export declare type BudRenderer = (config: any, webpackConfig: Configuration) => void;
export declare type CompilerFactory = (bud: any, config: WebpackConfig) => CompilerController;
export interface CompilerController {
    bud: any;
    config: WebpackConfig;
    compile: () => void;
}
//# sourceMappingURL=types.d.ts.map