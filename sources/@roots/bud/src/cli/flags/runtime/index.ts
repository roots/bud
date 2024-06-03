import {Option} from '@roots/bud-support/clipanion'
import {isBoolean, isLiteral, isOneOf} from '@roots/bud-support/typanion'

export default Option.String(`--runtime`, undefined, {
  description: `Set runtime chunk`,
  tolerateBoolean: true,
  validator: isOneOf([
    isLiteral(`single`),
    isLiteral(`multiple`),
    isBoolean(),
  ]),
})
