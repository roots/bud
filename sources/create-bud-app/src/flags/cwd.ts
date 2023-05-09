import {Option} from 'clipanion'

export default Option.String(`--cwd`, process.cwd(), {
  description: `Current working directory`,
})
