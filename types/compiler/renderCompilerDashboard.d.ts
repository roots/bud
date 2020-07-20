/**
 * Compiler renderer
 *
 * @type  {BudRenderer}
 * @param {bud} bude
 * @param {Configuration} webpackConfig
 */
declare const renderCompilerDashboard: BudRenderer;
export { renderCompilerDashboard };
import type { Configuration, Compiler } from 'webpack';
import type { bud } from '../builder';
export interface RunnerProps {
    config: object;
    webpackConfig: Configuration;
    compiler: Compiler;
}
export declare type BudRenderer = (config: bud, webpackConfig: Configuration) => void;
