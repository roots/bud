import {Option} from '@roots/bud-support/clipanion'

export default Option.String(`--storage`, undefined, {
  description: `Storage directory (relative to project)`,
  env: `APP_PATH_STORAGE`,
})
