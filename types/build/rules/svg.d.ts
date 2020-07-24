/**
 * SVG module rules
 * @return {object}
 */
declare const svg: (bud: any) => {
    bud: any;
    output: {};
    test: RegExp;
    loaders: string[];
    /**
     * Make svg rules
     */
    make: () => any;
    /**
     * Hook: pre_svg
     */
    pre: () => void;
    /**
     * Hook: post_svg
     */
    post: () => void;
};
export { svg };
//# sourceMappingURL=svg.d.ts.map