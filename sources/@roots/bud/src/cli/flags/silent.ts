import {Option} from '@roots/bud-support/clipanion'
export default Option.Boolean(`--silent,-s`, true, {
  description: `silence stdout`,
})
