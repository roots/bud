import isString from '@roots/bud-support/isString'
import minimist from '@roots/bud-support/minimist'

const raw = process.argv.slice(2)

const args = minimist(raw, {
  alias: {
    '@dist': [`dist`],
    '@src': [`src`],
    '@storage': [`storage`],
    [`path.basedir`]: [`basedir`],
    [`path.dist`]: [`dist`],
    [`path.src`]: [`src`],
    [`split-chunks`]: [`splitChunks`],
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

if (args.use && isString(args.use)) {
  args.use = args.use.split(`,`)
}

export const includes = (key: string) => args._.includes(key)

export default args
export {raw}
