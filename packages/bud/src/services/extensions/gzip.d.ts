import CompressionPlugin from 'compression-webpack-plugin';
import { Module, Framework } from '@roots/bud-typings';
export declare const when: Module.When;
export declare const options: Module.Options<CompressionPlugin.Options<CompressionPlugin.ZlibOptions>>;
export declare const make: (options: Framework.Container<CompressionPlugin.Options<CompressionPlugin.ZlibOptions>>, bud: Framework) => CompressionPlugin;
//# sourceMappingURL=gzip.d.ts.map