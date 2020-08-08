declare const useCss: (rule: string, bud: any, modular?: boolean) => {
    loader: any;
    options?: undefined;
} | {
    loader: any;
    options: {
        modules: boolean;
        onlyLocals: boolean;
    };
};
export { useCss };
//# sourceMappingURL=useCss.d.ts.map