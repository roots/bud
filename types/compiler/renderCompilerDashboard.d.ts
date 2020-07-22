/**
 * Webpack compilation dashboard renderer.
 */
declare const renderCompilerDashboard: BudRenderer;
export { renderCompilerDashboard };
/**
 * Typings
 */
import type { Configuration, Compiler } from 'webpack';
import type { Bud } from '../bud';
/**
 * Runner Props
 *
 * @interface
 * @property {bud} config - bud container
 * @property {Configuration} webpackConfig - webpack configuration object
 * @property {Compiler} compiler - webpack compiler
 */
export interface RunnerProps {
    config: object;
    webpackConfig: Configuration;
    compiler: Compiler;
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
//# sourceMappingURL=renderCompilerDashboard.d.ts.map