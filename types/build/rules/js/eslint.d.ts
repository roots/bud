/**
 * Eslint
 * @type {function} eslint
 */
declare const eslint: (bud: any) => {
    bud: any;
    enabled: any;
    enforce: string;
    test: RegExp;
    include: any;
    exclude: RegExp;
    loader: string;
    options: {
        configFile: any;
        formatter: string;
        failOnError: boolean;
    };
    output: {};
    /**
     * Make: eslint rules
     * @property {function} make
     */
    make: () => any;
    /**
     * Hook: pre_eslint
     */
    pre: () => void;
    /**
     * Hook: post_eslint
     */
    post: () => void;
};
export { eslint };
//# sourceMappingURL=eslint.d.ts.map