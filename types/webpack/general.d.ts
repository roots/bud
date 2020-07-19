/**
 * General webpack options
 */
export type general = () => {
    object;
};
/**
 * General webpack options
 *
 * @typedef {function () => {object}} general
 * @this {bud}
 */
export function general(bud: any): {
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
    make: () => {
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
    preHook: () => void;
    postHook: () => void;
};
