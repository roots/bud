import {Bud} from '../../../Bud'

import type {CompressionPlugin, Module} from '@roots/bud-typings'

export type Make = Module.Make<CompressionPlugin, Options>

export type Options = Module.Options<CompressionPlugin.Options>

export type When = Module.When

export type Config = (
  this: Bud,
  options?: CompressionPlugin.Options,
) => Bud
