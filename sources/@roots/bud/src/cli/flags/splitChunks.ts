import {Option} from '@roots/bud-support/clipanion'

export default Option.Boolean(`--splitChunks,--split-chunks,--vendor`, undefined, {
  description: `Separate vendor bundle`,
})
