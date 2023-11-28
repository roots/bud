import {Option} from '@roots/bud-support/clipanion'
import {isLiteral, isOneOf} from '@roots/bud-support/typanion'

export default Option.String(`--minimize`, undefined, {
  description: `Minimize compiled assets`,
  tolerateBoolean: true,
  validator: isOneOf([
    isLiteral(`js`),
    isLiteral(`css`),
    isLiteral(true),
    isLiteral(false),
  ]),
})
