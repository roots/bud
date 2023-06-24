import minimist from 'minimist'
import {createHash} from 'node:crypto'

let raw = process.argv.slice(2)
let args = minimist(raw)

let hash = createHash(`sha1`).update(args[`_`]?.join(`.`)).digest(`base64`)

export default args
export {hash, raw}
