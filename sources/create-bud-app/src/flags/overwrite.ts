import {Option} from 'clipanion'

export default Option.Boolean(`--overwrite,-o`, {
  description: `Overwrite existing files`,
})
