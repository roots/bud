declare const _default: {
    react: {
        react: {
            extends: string[];
            plugins: string[];
            settings: {
                react: {
                    version: string;
                };
            };
            rules: {
                'react/prop-types': number;
                'react/react-in-jsx-scope': number;
                'react-hooks/rules-of-hooks': number;
            };
        };
    };
    roots: {
        extends: string[];
        parser: string;
        parserOptions: {
            ecmaVersion: number;
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
    wordpress: {
        extends: string[];
        globals: {
            wp: boolean;
        };
    };
};
export = _default;
//# sourceMappingURL=index.d.ts.map