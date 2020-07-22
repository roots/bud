/**
 * Typescript
 * @type {function}
 */
declare const typescript: (builder: any) => {
    builder: any;
    output: {};
    enabled: any;
    loader: string;
    options: {
        configFile: any;
    };
    /**
     * Make typescript rules.
     */
    make: () => any;
    /**
     * Hook: pre_typescript
     */
    pre: () => void;
    /**
     * Hook: post_typescript
     */
    post: () => void;
};
export { typescript };
//# sourceMappingURL=typescript.d.ts.map