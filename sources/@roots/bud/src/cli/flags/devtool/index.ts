import {Option} from '@roots/bud-support/clipanion'
import {isBoolean, isLiteral, isOneOf} from '@roots/bud-support/typanion'

export default Option.String(`--devtool,--source-map`, undefined, {
  description: `Set devtool option`,
  tolerateBoolean: true,
  validator: isOneOf([
    isBoolean(),
    isLiteral(`eval`),
    isLiteral(`eval-cheap-source-map`),
    isLiteral(`eval-cheap-module-source-map`),
    isLiteral(`eval-source-map`),
    isLiteral(`cheap-source-map`),
    isLiteral(`cheap-module-source-map`),
    isLiteral(`source-map`),
    isLiteral(`inline-cheap-source-map`),
    isLiteral(`inline-cheap-module-source-map`),
    isLiteral(`inline-source-map`),
    isLiteral(`eval-nosources-cheap-source-map`),
    isLiteral(`eval-nosources-cheap-modules-source-map`),
    isLiteral(`eval-nosources-source-map`),
    isLiteral(`inline-nosources-cheap-source-map`),
    isLiteral(`inline-nosources-cheap-module-source-map`),
    isLiteral(`inline-nosources-source-map`),
    isLiteral(`nosources-cheap-source-map`),
    isLiteral(`nosources-cheap-module-source-map`),
    isLiteral(`hidden-nosources-cheap-source-map`),
    isLiteral(`hidden-nosources-cheap-module-source-map`),
    isLiteral(`hidden-nosources-source-map`),
    isLiteral(`hidden-cheap-source-map`),
    isLiteral(`hidden-cheap-module-source-map`),
    isLiteral(`hidden-source-map`),
  ]),
})
