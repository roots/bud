/**
 * Typings
 */
import type { Configuration, Stats } from 'webpack';
import type { Bud } from '..';
import type WebpackDevServer from 'webpack-dev-server';
export type { Bud, Configuration as WebpackConfig, Stats as WebpackStats, WebpackDevServer, };
/**
 * Runner Props
 *
 * @interface
 * @property {bud} config - bud container
 * @property {Configuration} webpackConfig - webpack configuration object
 * @property {Compiler} compiler - webpack compiler
 */
export interface RunnerProps {
    bud: Bud;
}
/**
 * BudRenderer
 *
 * @typedef {BudRenderer}
 * @param {bud} bud
 * @param {Configuration} webpackConfig
 * @return {void}
 */
export declare type BudRenderer = (config: Bud, webpackConfig: Configuration) => void;
//# sourceMappingURL=types.d.ts.map