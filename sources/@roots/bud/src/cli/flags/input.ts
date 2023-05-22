import {Option} from '@roots/bud-support/clipanion'

export default Option.String(`--input,-i,--@src,--src`, undefined, {
  description: `Source directory (relative to project)`,
  env: `APP_PATH_INPUT`,
})
