/**
 * ## bud.copy
 *
 * Copy a file.
 *
 * ```js
 * bud.copy(
 *   bud.src('images/image.png'),
 *   bud.dist('image.png'),
 * )
 * ```
 *
 * @param     {string} src - path to copy from
 * @param     {string} dist - path to copy to
 * @return    {typeof import('./../index')} bud
 */
const copy = (from, to) => {
  this.options.copy.patterns.push({from, to})

  return this
}

export {copy}
