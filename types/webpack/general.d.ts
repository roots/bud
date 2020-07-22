/**
 * General webpack options
 *
 * @this {bud}
 */
declare const general: (bud: any) => {
    bud: any;
    options: {
        context: any;
        devtool: any;
        mode: any;
        node: {
            module: string;
            dgram: string;
            dns: string;
            fs: string;
            http2: string;
            net: string;
            tls: string;
            child_process: string;
        };
        target: any;
        watch: any;
    };
    make: () => any;
    preHook: () => void;
    postHook: () => void;
};
export { general };
//# sourceMappingURL=general.d.ts.map