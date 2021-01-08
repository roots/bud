import type { Module } from '@roots/bud-typings';
import ReactRefreshPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import { ReactRefreshPluginOptions } from '@pmmmwh/react-refresh-webpack-plugin/types/types';
/**
 * Adds bud.reactRefresh() config handler.
 */
export * as api from './api';
/**
 * @pmmmwh/react-refresh-webpack-plugin implementation
 */
export declare const make: Module.Make<ReactRefreshPlugin, ReactRefreshPluginOptions>;
/**
 * @pmmmwh/react-refresh-webpack-plugin conditions
 */
export declare const when: Module.When;
/**
 * @pmmmwh/react-refresh-webpack-plugin options
 */
export declare const options: Module.Options;
//# sourceMappingURL=index.d.ts.map