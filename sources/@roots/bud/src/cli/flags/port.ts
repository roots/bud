import {Option} from '@roots/bud-support/clipanion'

export default Option.String(`--port`, undefined, {
  description: `Port to serve on`,
})
