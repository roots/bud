import {Option} from '@roots/bud-support/clipanion'

export default Option.Boolean(
  `--lazy`,
  undefined,
  {
    description: `Lazy compilation`,
  },
)
