import type {Factory} from '@roots/bud-build/config'
import type {Bud, RuleSetRule} from '@roots/bud-framework'

interface Props {
  filter: Bud[`hooks`][`filter`]
  path: Bud[`path`]
  rules: Bud[`build`][`rules`]
}

export const module: Factory<`module`> = async ({
  build: {rules},
  hooks: {filter},
  path,
}) =>
  filter(`build.module`, {
    noParse: filter(`build.module.noParse`, undefined),
    rules: getRules({filter, path, rules}),
    unsafeCache: filter(`build.module.unsafeCache`, undefined),
  })

/**
 * Get all module.rules
 */
const getRules = ({filter, path, rules}: Props): Array<RuleSetRule> => {
  return [
    ...filter(`build.module.rules.before`, [
      {
        include: [path(`@src`)],
        parser: {requireEnsure: false},
        test: filter(`pattern.js`),
      },
      rules.image.toWebpack
        ? {
            oneOf: [
              rules[`inline-image`]?.toWebpack?.(),
              rules.image?.toWebpack?.(),
            ].filter(Boolean),
            test: filter(`pattern.image`),
          }
        : undefined,

      rules.font.toWebpack
        ? {
            oneOf: [
              rules[`inline-font`]?.toWebpack?.(),
              rules.font?.toWebpack?.(),
            ].filter(Boolean),
            test: filter(`pattern.font`),
          }
        : undefined,

      rules.svg.toWebpack
        ? {
            oneOf: [
              rules[`inline-svg`]?.toWebpack?.(),
              rules.svg?.toWebpack?.(),
            ].filter(Boolean),
            test: filter(`pattern.svg`),
          }
        : undefined,
    ]),

    ...filter(`build.module.rules.oneOf`, [
      ...makeDefinedRuleSet({rules}),
      ...makeIssuerRuleSet({filter, path, rules}),
    ]).filter(Boolean),

    ...filter(`build.module.rules.after`, []),
  ].filter(Boolean)
}

/**
 * Make defined rule set
 */
const makeDefinedRuleSet = ({rules}: {rules: Props['rules']}) => {
  return Object.entries(rules)
    .filter(
      ([key]) =>
        ![
          `font`,
          `image`,
          `inline-font`,
          `inline-image`,
          `inline-svg`,
          `svg`,
        ].includes(key),
    )
    .map(([, rule]) => rule)
    .filter(Boolean)
    .map(rule => {
      return `toWebpack` in rule ? rule.toWebpack() : rule
    })
}

/**
 * Get rules for css and css-module imports issued by non-css files.
 */
const makeIssuerRuleSet = ({filter, path, rules}: Props) => {
  const results = []

  rules[`css-module`]?.toWebpack?.().use &&
    results.push({
      exclude: [path(`@src`)],
      issuer: {not: filter(`pattern.cssModule`)},
      test: filter(`pattern.cssModule`),
      use: rules[`css-module`].toWebpack?.().use,
    })

  rules[`css`]?.toWebpack?.().use &&
    results.push({
      exclude: [path(`@src`)],
      issuer: {not: filter(`pattern.css`)},
      test: filter(`pattern.css`),
      use: rules[`css`].toWebpack?.().use,
    })

  rules[`sass-module`]?.toWebpack?.().use &&
    results.push({
      exclude: [path(`@src`)],
      issuer: {not: filter(`pattern.sassModule`)},
      test: filter(`pattern.sassModule`),
      use: rules[`sass-module`].toWebpack?.().use,
    })

  rules[`sass`]?.toWebpack?.().use &&
    results.push({
      exclude: [path(`@src`)],
      issuer: {not: filter(`pattern.sass`)},
      test: filter(`pattern.sass`),
      use: rules[`sass`].toWebpack?.().use,
    })

  return results
}
