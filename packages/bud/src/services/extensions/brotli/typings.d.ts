/// <reference types="node" />
import type { CompressionPlugin, MaybeCallable, Framework, Module, zlib } from '@roots/bud-typings';
export declare type Make = Module.Make<CompressionPlugin, Options>;
export declare type Options = Module.Options<CompressionPlugin.Options<zlib.BrotliOptions>>;
export declare type When = Module.When;
export declare type Config = (this: Framework, options?: MaybeCallable<CompressionPlugin.Options<zlib.BrotliOptions>>) => Framework;
//# sourceMappingURL=typings.d.ts.map