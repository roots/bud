/**
 * Set the build target.
 * @example bud.target('web') // default
 * @param   {string} dir - path of src directory relative to the project root.
 * @return  {typeof import('./../index')} bud
 */
export function target(target: any): typeof import('./../index');
