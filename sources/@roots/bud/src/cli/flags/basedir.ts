import {Option} from '@roots/bud-support/clipanion'

export default Option.String(`--basedir,--cwd`, undefined, {
  description: `project base directory`,
  hidden: true,
})
