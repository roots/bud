/**
 * ## bud.alias
 *
 * Resolve modules through webpack aliases. Useful for situations that may otherwise require brittle relative paths.
 *
 * Having defined this alias:
 *
 * ```js
 * bud.alias({'scripts': bud.src('scripts')})
 * ```
 *
 * ```js
 * import 'scripts/myScript'
 * ```
 */
export type alias = (arg0: [any, string], arg1: {
    directory: string;
}[]) => {
    bud: typeof import('./../index');
};
/**
 * ## bud.alias
 *
 * Resolve modules through webpack aliases. Useful for situations that may otherwise require brittle relative paths.
 *
 * Having defined this alias:
 *
 * ```js
 * bud.alias({'scripts': bud.src('scripts')})
 * ```
 *
 * ```js
 * import 'scripts/myScript'
 * ```
 *
 * @typedef {function ([key: string]: {directory: string}[]) => {bud: typeof import('./../index')}} alias
 * @param   {[key: string]: {directory: string}} options
 * @return  {typeof import('./../index')} bud
 **/
export function alias(options: any): typeof import('./../index');
//# sourceMappingURL=alias.d.ts.map