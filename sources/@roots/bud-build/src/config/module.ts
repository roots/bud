import type {Factory} from '@roots/bud-build/config'
import type {Bud} from '@roots/bud-framework'

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
const getRules = ({filter, path, rules}: Props) => {
  return [
    ...filter(`build.module.rules.before`, [{
      include: [path(`@src`)],
      parser: {requireEnsure: false},
      test: filter(`pattern.js`),
    }]),
    {
      oneOf: [
        ...filter(`build.module.rules.oneOf`, [
          ...makeIssuerRuleSet({filter, path, rules}),
          ...getDefinedRules({rules}),
        ]),
      ],
    },
    ...filter(`build.module.rules.after`, []),
  ]
}

/**
 * Get the standard rules defined in the bud config, extensions, etc.
 */
const getDefinedRules = ({rules}: Partial<Props>) => {
  return Object.values(rules)
    .filter(Boolean)
    .map(rule => (`toWebpack` in rule ? rule.toWebpack() : rule))
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
