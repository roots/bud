import {join} from 'path'

/**
 * Copy all files from a specified source to a specified destination.
 * @namespace bud
 * @example   bud.copyAll(bud.src('images'), bud.dist('images'))
 * @typedef   {function (src: {string}, dest: {string}) => {bud: import('./../index')}} copyAll
 * @param     {string} src  - origin dir
 * @param     {string} dest - destination dir
 * @return    {import('./../index')} bud
 */
const copyAll = function (src, dest) {
  this.options.copy.patterns.push({
    from: '**/*',
    context: src,
    to: dest ? dest : join(this.options.dist, src),
    globOptions: {
      ignore: '.*',
    },
    noErrorOnMissing: true,
  })

  return this
}

export {copyAll}
