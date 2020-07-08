/**
 * Resolve modules through webpack aliases. Useful for situations that may otherwise require brittle relative paths.
 */
export type alias = (arg0: {
    [key: string]: any;
}, arg1: string[]) => {
    bud: typeof import('./../index');
};
/**
 * Resolve modules through webpack aliases. Useful for situations that may otherwise require brittle relative paths.
 * @example
 *  bud.alias({'scripts': bud.src('scripts')})
 *  ↪️ import 'scripts/myScript'
 * @memberof {typeof import('./../index')} Bud
 * @typedef {function ({[key: string]: directory: string[]}) => {bud: typeof import('./../index')}} alias
 * @param   {{[key: string]: {directory: string}}} options
 * @return  {typeof import('./../index')} Bud
 */
export function alias(options: {
    [key: string]: {
        directory: string;
    };
}): typeof import('./../index');
//# sourceMappingURL=alias.d.ts.map