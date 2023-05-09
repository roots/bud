import {Option} from 'clipanion'

export default Option.Boolean(`--wordpress`, false, {
  description: `Scaffold a project with recommended settings for wordpress theme or plugin development`,
})
