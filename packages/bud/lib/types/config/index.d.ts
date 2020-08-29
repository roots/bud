/// <reference types="webpack" />
import type { Bud } from './types';
import type { WebpackConfig } from '@roots/bud-typings';
declare const builders: (import("./entry").EntryBuilder | import("./devServer").DevServerBuilder | import("./externals").ExternalsBuilder | ((bud: Bud) => {
    context: any;
    devtool: any;
    mode: any;
    node: any;
    stats: any;
    target: any;
    watch: any;
}) | import("./rules").ModuleBuilder | import("./optimization").OptimizationBuilder | import("./output").OutputBuilder | import("./webpackResolve").ResolveBuilder | import("./plugins").PluginsBuilder)[];
declare type WebpackBuilder = (bud: Bud) => WebpackConfig;
declare const config: WebpackBuilder;
export { config, builders, WebpackBuilder, WebpackConfig };
//# sourceMappingURL=index.d.ts.map