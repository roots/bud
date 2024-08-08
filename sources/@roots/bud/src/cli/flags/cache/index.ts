import {Option} from '@roots/bud-support/clipanion'
import {isBoolean, isLiteral, isOneOf} from '@roots/bud-support/typanion'

export default Option.String(`--cache`, undefined, {
  description: `Utilize compiler's filesystem cache`,

  tolerateBoolean: true,
  validator: isOneOf([
    isLiteral(`filesystem`),
    isLiteral(`memory`),
    isBoolean(),
  ]),
})
