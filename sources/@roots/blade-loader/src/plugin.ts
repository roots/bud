import type {
  Compiler,
  RuleSetUseItem,
  WebpackPluginInstance,
} from 'webpack'

interface Options {
  templates?: string | Array<string>
}

const scriptLoaderIdents = [`babel`, `swc`, `ts`]
const catsAndDogs = /\.(js|mjs|jsx|ts|tsx|php)$/
const hasMatchingIdent = (ident: string) =>
  scriptLoaderIdents.includes(ident)
const testRuleSetUseItem = (item: RuleSetUseItem) => {
  if (typeof item === `string`) return false
  if (typeof item === `object` && typeof item.ident === `string`)
    return hasMatchingIdent(item.ident)
  return false
}

export default class BladeWebpackPlugin implements WebpackPluginInstance {
  public constructor(public options?: Options) {
    this.apply = this.apply.bind(this)
  }

  public async apply(compiler: Compiler) {
    compiler.hooks.afterEnvironment.tap(this.constructor.name, () => {
      compiler.options.module.rules = compiler.options.module.rules.map(
        rule => {
          if (typeof rule === `string`) return rule

          if (typeof rule === `object` && testRuleSetUseItem(rule)) {
            if (typeof rule.loader === `string`) {
              return {
                ...rule,
                test: catsAndDogs,
                use: [
                  rule.loader,
                  {loader: `@roots/blade-loader/script-loader`},
                  {loader: `@roots/blade-loader/asset-loader`},
                ],
              }
            }

            if (Array.isArray(rule.use)) {
              return {
                ...rule,
                test: catsAndDogs,
                use: [
                  ...rule.use,
                  {loader: `@roots/blade-loader/script-loader`},
                  {loader: `@roots/blade-loader/asset-loader`},
                ],
              }
            }

            if (typeof rule.use === `object`) {
              return {
                ...rule,
                test: catsAndDogs,
                use: [
                  rule.use,
                  {loader: `@roots/blade-loader/script-loader`},
                  {loader: `@roots/blade-loader/asset-loader`},
                ],
              }
            }
          }

          if (rule.oneOf) {
            return {
              ...rule,
              oneOf: rule.oneOf.map(ruleSetItem => {
                if (typeof ruleSetItem === `string`) return ruleSetItem

                if (
                  Array.isArray(ruleSetItem.use) &&
                  ruleSetItem.use.some(testRuleSetUseItem)
                ) {
                  return {
                    ...ruleSetItem,
                    test: catsAndDogs,
                    use: [
                      ...ruleSetItem.use,
                      {loader: `@roots/blade-loader/script-loader`},
                      {loader: `@roots/blade-loader/asset-loader`},
                    ],
                  }
                }

                return ruleSetItem
              }),
            }
          }

          return rule
        },
      )
    })
  }
}
