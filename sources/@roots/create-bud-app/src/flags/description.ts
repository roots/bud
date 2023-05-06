import {Option} from 'clipanion'

export default Option.String(
  `--description,-desc`,
  `project bootstrapped with @roots/create-bud-app`,
  {
    description: `Project description`,
  },
)
