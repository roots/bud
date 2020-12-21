import Plugin from 'compression-webpack-plugin'
import {BrotliOptions} from 'zlib'
import {Framework, Container, Module} from '@roots/bud-typings'

export type Make = Module.Make<
  Plugin,
  Container<Plugin.Options<BrotliOptions>>
>

export type Options = Plugin.Options<BrotliOptions>

export type When = Module.When

export type Config = (
  this: Framework,
  options?: BrotliOptions,
) => Framework
