import {Option} from 'clipanion'
import {isArray, isLiteral, isOneOf} from 'typanion'

export default Option.Array(`--support,-s`, [], {
  description: `Support for various components`,
  validator: isArray(
    isOneOf([
      isLiteral(`babel`),
      isLiteral(`emotion`),
      isLiteral(`eslint`),
      isLiteral(`postcss`),
      isLiteral(`prettier`),
      isLiteral(`react`),
      isLiteral(`sass`),
      isLiteral(`stylelint`),
      isLiteral(`swc`),
      isLiteral(`tailwindcss`),
      isLiteral(`typescript`),
      isLiteral(`vue`),
      isLiteral(`wordpress`),
    ]),
  ),
})
