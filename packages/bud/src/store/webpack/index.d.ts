/// <reference types="webpack" />
import { Webpack } from '@roots/bud-typings';
export * as optimization from './optimization';
export * as module from './module';
export * as output from './output';
export * as resolve from './resolve';
export declare const bail: Webpack.Configuration['bail'];
export declare const cache: Webpack.Configuration['cache'];
export declare const context: Webpack.Configuration['context'];
export declare const devtool: Webpack.Configuration['devtool'];
export declare const entry: Webpack.Configuration['entry'];
export declare const infrastructureLogging: {
    level: string;
};
export declare const mode: Webpack.Configuration['mode'];
export declare const name: Webpack.Configuration['name'];
export declare const performance: Webpack.Configuration['performance'];
export declare const parallelism: Webpack.Configuration['parallelism'];
export declare const plugins: Webpack.Configuration['plugins'];
export declare const profile: Webpack.Configuration['profile'];
export declare const recordsPath: Webpack.Configuration['recordsPath'];
export declare const stats: Webpack.Configuration['stats'];
export declare const target: Webpack.Configuration['target'];
export declare const watch: Webpack.Configuration['watch'];
//# sourceMappingURL=index.d.ts.map