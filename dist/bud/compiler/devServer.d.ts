import type { Bud, WebpackConfig } from './types';
import WDS from 'webpack-dev-server';
/**
 * Dev server (for HMR / live reload)
 *
 * @todo this is not currently implemented. Instead we're passing
 * the dev server middleware to BrowserSync. Finish implementing.
 */
declare const makeDevServer: (bud: Bud, webpackConfig: WebpackConfig) => WDS;
export { makeDevServer };
//# sourceMappingURL=devServer.d.ts.map