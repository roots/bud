import '@roots/bud-babel';
import type { Module } from '@roots/bud-framework';
declare module '@roots/bud-framework' {
    namespace Framework {
        interface Extensions {
            '@roots/bud-solid': Module;
        }
    }
}
export declare const name: string | number, boot: Module.Boot;
//# sourceMappingURL=index.d.ts.map