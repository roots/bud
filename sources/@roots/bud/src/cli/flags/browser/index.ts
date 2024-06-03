import {Option} from '@roots/bud-support/clipanion'

export default Option.String(`--browser`, undefined, {
  description: `Open browser on successful development build.`,
  tolerateBoolean: true,
})
