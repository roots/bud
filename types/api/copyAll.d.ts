/**
 * Copy all files from a specified source to a specified destination.
 * @example   bud.copyAll(bud.src('images'), bud.dist('images'))
 * @param     {string} src  - origin dir
 * @param     {string} dest - destination dir
 * @return    {typeof import('./../index')} bud
 */
export function copyAll(src: string, dest: string): typeof import('./../index');
