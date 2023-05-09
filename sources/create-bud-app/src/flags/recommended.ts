import {Option} from 'clipanion'

export default Option.Boolean(`--recommended`, false, {
  description: `Scaffold a vanilla js project with recommended settings`,
})
