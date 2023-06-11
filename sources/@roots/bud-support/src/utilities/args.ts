import minimist from 'minimist'
import {createHash} from 'node:crypto'

const UNCACHED_ARGS = [
  `cache`,
  `force`,
  `log`,
  `verbose`,
  `notify`,
  `debug`,
]

let raw = process.argv.slice(2)
let args = minimist(raw)

let hash = createHash(`sha1`)
  .update(
    Object.entries(args)
      .filter(([k, v]) => !UNCACHED_ARGS.includes(k))
      .flat(Infinity)
      .join(`.`)
      .concat(args[`_`]?.join(`.`))
      .concat(process.argv[0]),
  )
  .digest(`base64`)

export default args
export {hash, raw}
