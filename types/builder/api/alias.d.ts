/**
 * Resolve modules through webpack aliases. Useful for situations that may otherwise require brittle relative paths.
 */
export type alias = (arg0: {
    [key: string]: any;
}, arg1: string[]) => {
    bud: import('./../index');
};
/**
 * Resolve modules through webpack aliases. Useful for situations that may otherwise require brittle relative paths.
 * @example
 *  bud.alias({'scripts': bud.src('scripts')})
 *  ↪️ import 'scripts/myScript'
 * @typedef {function ({[key: string]: directory: string[]}) => {bud: import('./../index')}} alias
 * @param   {{[key: string]: {directory: string}}} options
 * @return  {import('./../index')}
 */
export function alias(options: {
    [key: string]: {
        directory: string;
    };
}): import('./../index');
//# sourceMappingURL=alias.d.ts.map