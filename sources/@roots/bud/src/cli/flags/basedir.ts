import {Option} from '@roots/bud-support/clipanion'

export default Option.String(`--basedir,--cwd`, undefined, {
  description: `Set project base directory`,
  hidden: true,
})
