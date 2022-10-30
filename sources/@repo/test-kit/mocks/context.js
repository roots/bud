import {dirname} from 'node:path'
import {fileURLToPath} from 'node:url'

const mock = {
  args: {
    dry: false,
  },
  basedir: dirname(fileURLToPath(import.meta.url)),
  extensions: {
    builtIn: [],
  },
}

export default mock
