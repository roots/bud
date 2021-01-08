/// <reference types="webpack" />
import { Webpack, Framework } from '@roots/bud-typings';
declare type Cfg = Webpack.Configuration['module'];
declare type Module = (this: Framework) => {
    module: Cfg;
};
export declare const moduleBuilder: Module;
export {};
//# sourceMappingURL=index.d.ts.map