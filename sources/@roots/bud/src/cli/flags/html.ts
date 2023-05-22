import {Option} from '@roots/bud-support/clipanion'

export default Option.String(`--html`, undefined, {
  description: `Generate an html template`,
  tolerateBoolean: true,
})
