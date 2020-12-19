import {Container, Bud} from '@roots/bud-typings'
import {Extension} from '@roots/bud-extensions'
import Plugin, {
  Options as PluginOptions,
} from 'eslint-webpack-plugin'

export type When = Extension.Module.When
export type Boot = Extension.Module.Boot

export type ToggleEslint = (this: Bud, enabled?: boolean) => Bud

export type Options = (bud: Bud) => PluginOptions

export type Make = (opts: Container) => Plugin

export type Api = (bud: Bud) => EslintConfig

export type EslintConfig = {
  enableEslint: ToggleEslint
  eslintConfig: ConfigureEslint
}

export type ConfigureEslint = (
  this: Bud,
  opts: PluginOptions,
) => Bud
