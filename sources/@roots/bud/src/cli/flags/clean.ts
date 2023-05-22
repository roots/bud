import {Option} from '@roots/bud-support/clipanion'

export default Option.Boolean(`--clean`, undefined, {
  description: `Clean artifacts and distributables prior to compilation`,
})
