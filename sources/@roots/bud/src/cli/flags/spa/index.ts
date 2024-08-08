import {Option} from '@roots/bud-support/clipanion'

export default Option.String(
  `--spa,--single-page-application`,
  undefined,
  {
    description: `Single page application mode`,
    tolerateBoolean: true,
  },
)
