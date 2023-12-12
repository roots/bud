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
    noParse: getNoParse(filter),
    rules: getRules({filter, path, rules}),
    unsafeCache: getUnsafeCache(filter),
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
              rules.image.toWebpack?.(),
            ].filter(Boolean),
            test: filter(`pattern.image`),
          }
        : undefined,

      rules.font.toWebpack
        ? {
            oneOf: [
              rules[`inline-font`]?.toWebpack?.(),
              rules.font.toWebpack(),
            ].filter(Boolean),
            test: filter(`pattern.font`),
          }
        : undefined,

      rules.svg.toWebpack
        ? {
            oneOf: [
              rules[`inline-svg`]?.toWebpack?.(),
              rules.svg.toWebpack(),
            ].filter(Boolean),
            test: filter(`pattern.svg`),
          }
        : undefined,
    ]),
    {
      oneOf: [
        ...filter(`build.module.rules.oneOf`, [
          ...getDefinedRules({rules}),
          ...makeIssuerRuleSet({filter, path, rules}),
        ]),
      ].filter(Boolean),
    },
    ...filter(`build.module.rules.after`, []),
  ].filter(Boolean)
}

/**
 * Get the standard rules defined in the bud config, extensions, etc.
 */
const getDefinedRules = ({rules}: Partial<Props>) => {
  return [
    ...Object.entries(rules)
      .filter(([key, _]) => {
        return !DEFINED.includes(key) && !RESOURCES.includes(key)
      })
      .map(([_, value]) => value),
    ...DEFINED.map(key => rules[key]),
  ]
    .filter(Boolean)
    .map(rule => (`toWebpack` in rule ? rule.toWebpack() : rule))
}

const RESOURCES = [
  `image`,
  `font`,
  `svg`,
  `inline-font`,
  `inline-image`,
  `inline-svg`,
]

const DEFINED = [
  `csv`,
  `toml`,
  `yml`,
  `json`,
  `html`,
  `webp`,
  `scss-module`,
  `scss`,
  `css-module`,
  `css`,
  `vue`,
  `js`,
  `ts`,
]

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

  return results
}

const getNoParse = (filter: Props[`filter`]) =>
  filter(`build.module.noParse`, undefined)

/**
 * By leaving undefined, webpack will strongly cache parsed modules from node_modules
 * but leave the rest. This is the default behavior.
 */
const getUnsafeCache = (filter: Props[`filter`]) =>
  filter(`build.module.unsafeCache`, undefined)
