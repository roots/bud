/// <reference types="connect" />
import hotMiddleware from 'webpack-hot-middleware';
declare const hot: (bud: any) => import("connect").NextHandleFunction & hotMiddleware.EventStream;
export { hot as default };
//# sourceMappingURL=hot.d.ts.map