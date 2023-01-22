import {bind} from 'helpful-decorators'
import isArray from 'lodash/isArray.js'
import isObject from 'lodash/isObject.js'
import isString from 'lodash/isString.js'
import isUndefined from 'lodash/isUndefined.js'
import omit from 'lodash/omit.js'
import type {Compiler, RuleSetRule, WebpackPluginInstance} from 'webpack'

import {scriptLoaders, scriptPattern} from './constants.js'

interface RuleSetItem extends RuleSetRule {
  loader?: string
  ident?: string
  options?: Record<string, any> | string
}
interface Options {
  extractScripts?: boolean
  publicPath?: string
}

export default class BladeWebpackPlugin implements WebpackPluginInstance {
  public constructor(public options?: Options) {}

  @bind
  public async apply(compiler: Compiler) {
    compiler.hooks.afterEnvironment.tap(this.constructor.name, () => {
      compiler.options.module.rules = compiler.options.module.rules.map(
        this.processRule,
      )
    })
  }

  @bind
  public isScriptExtractionEnabled() {
    return (
      isUndefined(this.options?.extractScripts) ||
      this.options.extractScripts !== false
    )
  }

  @bind
  public isScriptRule(rule: RuleSetRule) {
    if (isUndefined(rule.test)) return false
    if (!(rule.test instanceof RegExp)) return false

    const test = rule.test
    return [`.js`, `.jsx`, `.ts`, `.tsx`].some(ext => ext.match(test))
  }

  @bind
  public processRule(rule: RuleSetRule) {
    if (!isObject(rule)) return rule

    if (rule.oneOf) {
      return {...rule, oneOf: rule.oneOf.map(this.processRule)}
    }

    if (this.isScriptExtractionEnabled() && this.isScriptRule(rule)) {
      return this.transformRule(rule, scriptPattern, scriptLoaders)
    }

    return rule
  }

  @bind
  public transformRule(
    rule: RuleSetItem,
    test: RegExp,
    loaders: Array<RuleSetItem>,
  ): RuleSetItem {
    if (isArray(rule.use)) {
      return {...rule, test, use: [...rule.use, ...loaders]}
    }

    if (isObject(rule.use)) {
      return {...rule, test, use: [rule.use, ...loaders]}
    }

    if (isString(rule.loader)) {
      return {
        ...omit(rule, `loader`),
        test,
        use: [rule.loader, ...loaders],
      }
    }

    return rule
  }
}
