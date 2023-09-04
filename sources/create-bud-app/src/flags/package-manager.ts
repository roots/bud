import {Option} from 'clipanion'
import {isLiteral, isOneOf} from 'typanion'

export default Option.String(`--package-manager,-p`, `npm`, {
  description: `Package manager`,
  validator: isOneOf([
    isLiteral(`npm`),
    isLiteral(`pnpm`),
    isLiteral(`yarn classic`),
    isLiteral(`yarn`),
  ]),
})
