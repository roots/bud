import StylelintPlugin from 'stylelint-webpack-plugin';
declare const stylelint: {
    setOptions: () => {
        configFile: any;
    };
    make: () => StylelintPlugin;
    when: () => any;
};
export { stylelint };
//# sourceMappingURL=stylelint.d.ts.map