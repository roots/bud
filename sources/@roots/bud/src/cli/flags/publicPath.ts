import {Option} from '@roots/bud-support/clipanion'

export default Option.String(`--output,-o,--@dist,--dist`, undefined, {
  description: `Distribution directory (relative to project)`,
  env: `APP_PATH_OUTPUT`,
})
