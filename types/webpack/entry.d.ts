/**
 * Entrypoints
 *
 * @param {object} entry
 * @return {typeof import('webpack').entry} entry
 */
declare const entry: (bud: any) => {
    bud: any;
    options: {
        entry: any;
    };
    make: () => any;
    preHook: () => void;
    postHook: () => void;
};
export { entry };
//# sourceMappingURL=entry.d.ts.map