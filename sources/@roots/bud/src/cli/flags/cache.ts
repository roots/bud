import {Option} from '@roots/bud-support/clipanion'
import {isLiteral, isOneOf} from '@roots/bud-support/typanion'

export default Option.String(`--cache`, undefined, {
  description: `Utilize compiler's filesystem cache`,
  env: `APP_CACHE`,
  tolerateBoolean: true,
  validator: isOneOf([
    isLiteral(`filesystem`),
    isLiteral(`memory`),
    isLiteral(true),
    isLiteral(false),
  ]),
})
