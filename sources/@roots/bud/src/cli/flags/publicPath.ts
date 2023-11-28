import {Option} from '@roots/bud-support/clipanion'

export default Option.String(`--publicPath`, undefined, {
  description: `Public path to serve assets from`,
})
