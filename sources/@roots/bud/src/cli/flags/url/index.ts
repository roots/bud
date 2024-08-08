import {Option} from '@roots/bud-support/clipanion'

export default Option.String(`--url,--host`, undefined, {
  description: `Set development server url`,
})
