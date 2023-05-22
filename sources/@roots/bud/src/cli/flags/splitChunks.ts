import {Option} from '@roots/bud-support/clipanion'

export default Option.Boolean(`--splitChunks,--vendor`, undefined, {
  description: `Separate vendor bundle`,
})
