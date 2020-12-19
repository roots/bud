import Plugin from 'compression-webpack-plugin'
import {BrotliOptions} from 'zlib'
import {Bud, Container, Extension} from '@roots/bud-typings'

export type Make = Extension.Module.Make<
  Plugin,
  Container<Plugin.Options<BrotliOptions>>
>

export type Options = Plugin.Options<BrotliOptions>

export type When = Extension.Module.When

export type Config<T = Bud> = (
  this: T,
  options?: BrotliOptions,
) => T
