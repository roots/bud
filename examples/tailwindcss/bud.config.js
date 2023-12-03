/**
 * This is totally optional. This example is otherwise zero-config. As in, you
 * could delete this entire file and lines 3-5 of `src/index.js` and it would
 * build.
 *
 * This call enables direct use of color values in your application scripts.
 *
 * @example
 * ```js
 * import colors from '@tailwind/colors'
 * document.body.style.backgroundColor = colors.indigo[600]
 * ```
 */
export default async bud => {
  bud.tailwind.generateImports(['colors'])
}
