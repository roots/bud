import {Option} from '@roots/bud-support/clipanion'

export default Option.Boolean(`--esm`, undefined, {
  description: `Compile to esm (experimental)`,
})
