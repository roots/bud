/// <reference types="webpack-dev-server" />
import type { WebpackConfig, WebpackDevServer } from '@roots/bud-typings';
import type { Loose } from '@roots/bud-typings';
import type { Configuration, Stats } from 'webpack';
export type { Configuration as WebpackConfig, Stats as WebpackStats, WebpackDevServer, };
export declare interface RunnerProps {
    bud: Loose;
}
export declare type BudRenderer = (config: any, webpackConfig: Configuration) => void;
export declare type CompilerFactory = (bud: Loose, config: WebpackConfig) => CompilerController;
export interface CompilerController {
    bud: Loose;
    config: WebpackConfig;
    compile: () => void;
}
//# sourceMappingURL=types.d.ts.map