import {Option} from 'clipanion'

export default Option.Boolean(`--customize`, false, {
  description: `Use with preset to customize options interactively`,
})
