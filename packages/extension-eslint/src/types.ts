import {Extension, Container, Bud} from '@roots/bud-typings'
import Plugin, {
  Options as PluginOptions,
} from 'eslint-webpack-plugin'

export type EslintConfig = {
  enableEslint: ToggleEslint
  eslintConfig: ConfigureEslint
}

export type ConfigureEslint = (
  this: Bud,
  opts: PluginOptions,
) => Bud

export type ToggleEslint = (this: Bud, enabled?: boolean) => Bud

export type Options = (bud: Bud) => PluginOptions

export type Make = (opts: Container) => Plugin

export type When = Extension.When

export type Boot = Extension.Boot

export type Api = (bud: Bud) => EslintConfig
