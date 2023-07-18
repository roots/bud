import minimist from 'minimist'

let raw = process.argv.slice(2)
let args = minimist(raw, {
  alias: {
    '@dist': [`dist`],
    '@src': [`src`],
    '@storage': [`storage`],
    [`path.basedir`]: [`basedir`],
    [`path.dist`]: [`dist`],
    [`path.src`]: [`src`],
    cwd: [`basedir`],
    discovery: [`discover`],
    flush: [`force`],
    i: [`src`],
    input: [`src`],
    o: [`dist`],
    output: [`dist`],
    s: [`silent`],
    vendor: [`splitChunks`],
  },
})

export default args
export {raw}
