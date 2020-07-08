/**
 * Copy a file.
 * @namespace bud
 * @example   bud.copy(bud.src('images/image.png'), bud.dist('image.png'))
 * @typedef   {function (from: {string}, to: {string}) => {bud: import('./../index.js')}} copy
 * @param     {string} src - path to copy from
 * @param     {string} dist - path to copy to
 * @return    {import('./../index.js')} bud
 */
const copy = (from, to) => {
  this.options.copy.patterns.push({from, to})

  return this
}

export {copy}
