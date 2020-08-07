/**
 * Preset configurations for common webpack plugins.
 */
declare const presets: {
    eslint: {
        config: {
            extends: string[];
            plugins: string[];
            globals: {
                wp: boolean;
            };
            parser: string;
            parserOptions: {
                ecmaVersion: number;
            };
            settings: {
                react: {
                    version: string;
                };
            };
            env: {
                browser: boolean;
                node: boolean;
            };
            rules: {
                strict: number;
                'no-console': number;
                'no-extra-semi': number;
                'comma-dangle': (string | {
                    arrays: string;
                    objects: string;
                    imports: string;
                    exports: string;
                    functions: string;
                })[];
            };
        };
        file: string;
    };
    postCss: {
        config: {
            plugins: any[];
        };
        file: string;
    };
    stylelint: {
        config: {
            extends: string;
            rules: {
                'declaration-colon-newline-after': null;
                'value-list-comma-newline-after': null;
                'no-empty-source': null;
                'no-descending-specificity': null;
                'at-rule-empty-line-before': null;
                'at-rule-no-unknown': (boolean | {
                    ignoreAtRules: string[];
                })[];
            };
        };
        file: string;
    };
    "babel-wp": {
        config: () => {
            presets: any[];
            plugins: any[];
        };
        file: string;
    };
};
export { presets };
//# sourceMappingURL=index.d.ts.map