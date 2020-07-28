/**
 * Font module rules
 *
 * @typedef {function} font
 * @return {object}
 */
declare const font: (builder: any) => {
    builder: any;
    make: () => {
        test: RegExp;
        use: {
            loader: string;
            options: {
                name: string;
            };
        }[];
    };
};
export { font };
//# sourceMappingURL=font.d.ts.map