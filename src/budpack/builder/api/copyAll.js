import {join} from 'path'

/**
 * API builder: makeCopyAll
 *
 * @type   {func.<makeCopyAll>}
 * @param  {object.<bud>}
 * @return {void}
 */
const makeCopyAll = bud => {
/**
 * Copy all files within a source directory to a dist directory.
 *
 * @typedef {func.<copyAll>} copyAll
 * @param   {string} from - copy from
 * @param   {string} [to=bud.paths.dist] copy to
 * @return  {object.<bud>}   bud instance
 */
const copyAll = (from, to = null) => {
  bud.options.copy.patterns.push({
    from: '**/*',
    context: from,
    to: to ? to : join(bud.options.dist, from),
    globOptions: {
      ignore: '.*',
    },
    noErrorOnMissing: true,
  })

  return bud
}

  return copyAll
}

export {makeCopyAll}
