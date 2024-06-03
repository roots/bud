import {Option} from '@roots/bud-support/clipanion'

export default Option.String(`--editor`, undefined, {
  description: `Open editor to file containing errors on unsuccessful development build`,
  tolerateBoolean: true,
})
