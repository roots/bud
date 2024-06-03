import {Option} from '@roots/bud-support/clipanion'
import {isLiteral, isOneOf} from '@roots/bud-support/typanion'

export default Option.String(`--mode`, undefined, {
  description: `Compilation mode`,
  validator: isOneOf([isLiteral(`production`), isLiteral(`development`)]),
})
