import {Extension, Container, Bud} from '@roots/bud-typings'
import Plugin, {
  Options as PluginOptions,
} from 'eslint-webpack-plugin'

export type EslintConfig = {
  enableEslint: ToggleEslint
  eslintConfig: ConfigureEslint
}

export type ConfigureEslint = (
  this: Bud.Bud,
  opts: PluginOptions,
) => Bud.Bud

export type ToggleEslint = (
  this: Bud.Bud,
  enabled?: boolean,
) => Bud.Bud

export type Options = (bud: Bud.Bud) => PluginOptions

export type Make = (opts: Container) => Plugin

export type When = Extension.When

export type Boot = Extension.Boot

export type Api = (bud: Bud.Bud) => EslintConfig
