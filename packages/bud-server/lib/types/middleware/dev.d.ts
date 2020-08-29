/// <reference types="connect" />
import middleware from 'webpack-dev-middleware';
declare const dev: (bud: any) => middleware.WebpackDevMiddleware & import("connect").NextHandleFunction;
export { dev as default };
//# sourceMappingURL=dev.d.ts.map