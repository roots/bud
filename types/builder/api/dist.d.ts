/**
 * Yield an absolute path from a path relative to the dist dir.
 * @example bud.dist('scripts/app.js') // returns the absolute path to the compiled app.js
 * @param   {string} relativePath - relative path
 * @return  {string} absolute path
 */
export function dist(relativePath: string): string;
