import type {Bud} from '@roots/bud-framework'

import type {Factory} from './index.js'

interface Props {
  filter: Bud[`hooks`][`filter`]
  rules: Bud[`build`][`rules`]
  path: Bud[`path`]
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
      test: filter(`pattern.js`),
      include: [path(`@src`)],
      parser: {requireEnsure: false},
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

const getUnsafeCache = (filter: Props[`filter`]) =>
  filter(`build.module.unsafeCache`, false)
