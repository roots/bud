/**
 * Options container.
 */
export type options = any;
export namespace options {
    export const babel: any;
    export const postCss: any;
    export namespace svg {
        export const use: string[];
    }
    export const auto: {};
    export namespace browserSync {
        export const host: any;
        export const port: any;
        export const proxy: any;
    }
    export namespace copy {
        export const patterns: any[];
    }
    export namespace dev {
        export const disableHostCheck: boolean;
        export const headers: {
            'Access-Control-Allow-Origin': string;
        };
        export const hotOnly: boolean;
        export const injectHot: boolean;
        export const open: boolean;
        export const overlay: boolean;
        export namespace watchOptions {
            export const aggregateTimeout: number;
        }
    }
    export const devtool: string;
    export const entry: {};
    export { env };
    export namespace inlineManifest {
        export const name: string;
    }
    export namespace splitting {
        export const maxChunks: any;
    }
    export namespace vendor {
        const name_1: string;
        export { name_1 as name };
        export const vendors: any[];
    }
    export namespace dependencyManifest {
        export const combineAssets: boolean;
        export const injectPolyfill: boolean;
        export const outputFormat: string;
    }
}
import { env } from "./env";
//# sourceMappingURL=options.d.ts.map