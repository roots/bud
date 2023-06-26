import minimist from 'minimist'

let raw = process.argv.slice(2)
let args = minimist(raw)

export default args
export {raw}
