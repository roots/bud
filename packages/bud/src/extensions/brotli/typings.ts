import type {
  CompressionPlugin,
  Framework,
  Module,
  zlib,
} from '@roots/bud-typings'

export type Make = Module.Make<CompressionPlugin, Options>

export type Options = CompressionPlugin.Options<
  zlib.BrotliOptions
>

export type When = Module.When

export type Config = (
  this: Framework,
  options?: zlib.BrotliOptions,
) => Framework
