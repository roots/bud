declare const cli: ({
    repository: string;
    contents: (bud: import("../types").Bud) => {
        log: unknown;
        hot: unknown;
        watch: unknown;
        level: unknown;
        mode: any;
        host: any;
        port: any;
        proxy: any;
        src: any;
        dist: any;
        feature: any;
    };
} | {
    repository: string;
    contents: {
        log: boolean;
        hot: boolean;
        watch: boolean;
    };
})[];
export { cli };
//# sourceMappingURL=index.d.ts.map