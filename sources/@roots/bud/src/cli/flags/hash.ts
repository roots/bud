import {Option} from '@roots/bud-support/clipanion'

export default Option.String(`--hash`, undefined, {
  description: `Hash compiled filenames`,
  tolerateBoolean: true,
})
