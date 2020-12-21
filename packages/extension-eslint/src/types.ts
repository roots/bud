import {Container, Framework, Module} from '@roots/bud-typings'
import Plugin, {
  Options as PluginOptions,
} from 'eslint-webpack-plugin'

export type When = Module.When
export type Boot = Module.Boot

export type ToggleEslint = (
  this: Framework,
  enabled?: boolean,
) => Framework

export type Options = (bud: Framework) => PluginOptions

export type Make = (opts: Container) => Plugin

export type Api = (bud: Framework) => EslintConfig

export type EslintConfig = {
  enableEslint: ToggleEslint
  eslintConfig: ConfigureEslint
}

export type ConfigureEslint = (
  this: Framework,
  opts: PluginOptions,
) => Framework
