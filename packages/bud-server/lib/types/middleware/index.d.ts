/// <reference types="webpack-dev-middleware" />
/// <reference types="connect" />
/// <reference types="webpack-hot-middleware" />
declare const middleware: (((bud: any) => import("webpack-dev-middleware").WebpackDevMiddleware & import("connect").NextHandleFunction) | ((bud: any) => import("http-proxy-middleware").RequestHandler) | ((bud: any) => import("connect").NextHandleFunction & import("webpack-hot-middleware").EventStream))[];
export { middleware as default };
//# sourceMappingURL=index.d.ts.map