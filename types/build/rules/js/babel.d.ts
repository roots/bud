/**
 * Babel
 *
 * @type {function} babel
 * @return {object}
 */
declare const babel: (bud: any) => {
    bud: any;
    output: {};
    enabled: any;
    loader: string;
    options: any;
    /**
     * Make babel rules
     */
    make: () => any;
    /**
     * Hook: pre_babel
     */
    pre: () => void;
    /**
     * Hook: post_babel
     */
    post: () => void;
};
export { babel };
//# sourceMappingURL=babel.d.ts.map