import type {Bud} from '@roots/bud-framework'

import type {Factory} from './index.js'

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

const getRules = ({filter, path, rules}: Props) => [
  ...filter(`build.module.rules.before`, [
    {
      include: [path(`@src`)],
      parser: {requireEnsure: false},
      test: filter(`pattern.js`),
    },
  ]),
  {
    oneOf: filter(
      `build.module.rules.oneOf`,
      Object.values(rules)
        .filter(Boolean)
        .map(rule => (`toWebpack` in rule ? rule.toWebpack() : rule)),
    ),
  },
  ...filter(`build.module.rules.after`, []),
]

const getNoParse = (filter: Props[`filter`]) =>
  filter(`build.module.noParse`, undefined)

/**
 * By leaving undefined, webpack will strongly cache parsed modules from node_modules
 * but leave the rest. This is the default behavior.
 */
const getUnsafeCache = (filter: Props[`filter`]) =>
  filter(`build.module.unsafeCache`, undefined)
