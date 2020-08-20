/**
 * Preset configurations for common webpack plugins.
 */
declare const presets: {
    postcss: {
        config: {
            plugins: any[];
        };
        file: string;
    };
    "babel-wp": {
        config: (any: any) => {
            presets: any[];
            plugins: any[];
        };
        file: string;
    };
};
export { presets };
//# sourceMappingURL=index.d.ts.map