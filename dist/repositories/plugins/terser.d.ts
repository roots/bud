import TerserPlugin from 'terser-webpack-plugin';
declare const terser: () => {
    setOptions: () => {
        parallel: boolean;
        terserOptions: {
            ecma: number;
        };
    };
    make: () => TerserPlugin;
    when: () => any;
};
export { terser };
//# sourceMappingURL=terser.d.ts.map