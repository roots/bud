import {Option} from 'clipanion'
import {isArray, isLiteral, isOneOf} from 'typanion'

export default Option.Array(`--support,-s`, [], {
  description: `Support for various components`,
  validator: isArray(
    isOneOf([
      isLiteral(`swc`),
      isLiteral(`typescript`),
      isLiteral(`babel`),
      isLiteral(`emotion`),
      isLiteral(`sass`),
      isLiteral(`postcss`),
      isLiteral(`tailwindcss`),
      isLiteral(`wordpress`),
      isLiteral(`react`),
      isLiteral(`vue`),
      isLiteral(`eslint`),
      isLiteral(`stylelint`),
      isLiteral(`prettier`),
    ]),
  ),
})
