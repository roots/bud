import {Option} from '@roots/bud-support/clipanion'
import {isArray, isString} from '@roots/bud-support/typanion'

export default Option.Array(`--use`, undefined, {
  description: `Enable an extension`,
  validator: isArray(isString()),
})
