import type {
  CompressionPlugin,
  MaybeCallable,
  Framework,
  Module,
  zlib,
} from '@roots/bud-typings'

export type Make = Module.Make<CompressionPlugin, Options>

export type Options = Module.Options<
  CompressionPlugin.Options<zlib.BrotliOptions>
>

export type When = Module.When

export type Config = (
  this: Framework,
  options?: MaybeCallable<
    CompressionPlugin.Options<zlib.BrotliOptions>
  >,
) => Framework
