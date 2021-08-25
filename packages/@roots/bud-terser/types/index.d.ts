import './interface';
import { Framework, Module } from '@roots/bud-framework';
import TerserPlugin from 'terser-webpack-plugin';
export declare const name: Module['name'];
export declare const options: Module.Options<TerserPlugin.Options>;
export declare const boot: Module.Boot;
export declare const api: {
    terser: (options: any) => Framework;
};
declare const extension: Module;
export { extension, extension as default };
//# sourceMappingURL=index.d.ts.map