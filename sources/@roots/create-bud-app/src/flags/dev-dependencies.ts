import {Option} from 'clipanion'

export default Option.Array(
  `--dev-dependencies,--devDependencies,-dd`,
  [`@roots/bud`],
  {
    description: `Development dependencies to install`,
  },
)
