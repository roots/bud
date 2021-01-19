import {Container, Framework} from '@roots/bud-typings'
import {Bud} from '@roots/bud'
import Plugin, {
  Options as PluginOptions,
} from 'eslint-webpack-plugin'

export type When = Bud.Module.When
export type Boot = Bud.Module.Boot

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

export {PluginOptions}

export type ConfigureEslint = (
  this: Framework,
  opts: PluginOptions,
) => Framework
