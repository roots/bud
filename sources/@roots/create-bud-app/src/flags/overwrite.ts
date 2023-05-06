import {Option} from 'clipanion'

export default Option.Boolean(`--overwrite,-o`, undefined, {
  description: `Overwrite existing files`,
})
