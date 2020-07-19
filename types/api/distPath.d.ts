/**
 * Set the project's dist directory.
 * @example bud.distPath('dist') // default unless specified
 * @param   {string} dir - path of dist directory relative to the project root.
 * @return  {typeof import('./../index')} bud
 */
export function distPath(dir: string): typeof import('./../index');
