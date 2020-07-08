/**
 * Yield an absolute path from a path relative to the dist dir.
 */
export type dist = (arg0: any, arg1: {
    string;
}) => {
    absolutePath: {
        string;
    };
};
/**
 * Yield an absolute path from a path relative to the dist dir.
 * @example bud.dist('scripts/app.js') // returns the absolute path to the compiled app.js
 * @typedef {function (relativePath: {string}) => {absolutePath: {string}}} dist
 * @param   {string} relativePath - relative path
 * @return  {string} absolute path
 */
export function dist(relativePath: string): string;
//# sourceMappingURL=dist.d.ts.map