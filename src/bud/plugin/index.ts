import {webpackAdapters} from './adapters/webpack'
import {controller} from './controller'

/**
 * bud.plugin export
 */
export const plugin: Plugin = {
  webpackAdapters,
  controller,
}

export type Plugin = {
  webpackAdapters: WebpackAdapters
  controller: (bud: Bud) => Controller
}

/**
 * bud.plugin typings
 */
import {Bud} from '..'
export {Bud} from '..'

export type WebpackAdapter = () => any

export type WebpackAdapters = RegisteredPlugin[]

export type RegisteredPlugin = [string, WebpackAdapter]

export interface BudPlugin {
  setOptions?: Function
  mergeOptions?: Function
  make?: Function
  when?: Function
}

export type Controller = {
  bud?: Bud
  plugin?: BudPlugin
  name?: string
  initController?: ([
    string,
    object,
  ]: RegisteredPlugin) => Controller
  initPlugin?: () => any
  buildPlugin?: () => any
  bindPluginProps?: () => any
  ensurePluginProp?: (arg0: string, arg1: any) => any
  setPluginOptions?: () => any
  mergePluginOptions?: () => any
  makePlugin?: () => any
  doPluginHook?: (hook: string, ...args: any) => any
}
