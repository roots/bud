import {Extension, Container, Bud} from '@roots/bud-typings'
import Plugin, {
  Options as PluginOptions,
} from 'eslint-webpack-plugin'

export type EslintConfig = {
  enableEslint: ToggleEslint
  eslintConfig: ConfigureEslint
}

export type ConfigureEslint = (
  this: Bud.Contract,
  opts: PluginOptions,
) => Bud.Contract

export type ToggleEslint = (
  this: Bud.Contract,
  enabled?: boolean,
) => Bud.Contract

export type Options = Extension.Options<PluginOptions>

export type Make = (opts: Container<PluginOptions>) => Plugin

export type When = Extension.When

export type Boot = Extension.Boot

export type Api = (bud: Bud.Contract) => EslintConfig
