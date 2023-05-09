import {Option} from 'clipanion'

export default Option.Boolean(`--confirm-existing,-c`, false, {
  description: `Confirm usage in existing directory`,
})
