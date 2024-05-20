import {Option} from '@roots/bud-support/clipanion'
import {
  cascade,
  isInInclusiveRange,
  isInteger,
  isNumber,
} from '@roots/bud-support/lodash/typanion'

const isPort = cascade(isNumber(), [
  isInteger(),
  isInInclusiveRange(1, 65535),
])

export default Option.String(`--port`, undefined, {
  description: `Port to serve on`,
  validator: isPort,
})
