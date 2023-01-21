import type {
  Compiler,
  RuleSetUseItem,
  WebpackPluginInstance,
} from 'webpack'

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
  public constructor() {
    this.apply = this.apply.bind(this)
  }

  public async apply(compiler: Compiler) {
    const assetLoader = {
      loader: `@roots/blade-loader/asset-loader`,
      type: `asset/source`,
    }
    const scriptLoader = {
      loader: `@roots/blade-loader/script-loader`,
    }

    compiler.hooks.afterEnvironment.tap(this.constructor.name, () => {
      compiler.options.module.rules = compiler.options.module.rules.map(
        rule => {
          if (typeof rule === `string`) return rule

          if (typeof rule === `object` && testRuleSetUseItem(rule)) {
            if (typeof rule.loader === `string`) {
              return {
                ...rule,
                test: catsAndDogs,
                use: [rule.loader, scriptLoader, assetLoader],
              }
            }

            if (Array.isArray(rule.use)) {
              return {
                ...rule,
                test: catsAndDogs,
                use: [...rule.use, scriptLoader, assetLoader],
              }
            }

            if (typeof rule.use === `object`) {
              return {
                ...rule,
                test: catsAndDogs,
                use: [rule.use, scriptLoader, assetLoader],
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
                    use: [...ruleSetItem.use, scriptLoader, assetLoader],
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
