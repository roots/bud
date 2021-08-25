import { Module } from '@roots/bud-framework';
declare module '@roots/bud-framework' {
    namespace Framework {
        interface Extensions {
            '@roots/bud-wordpress-manifests': Module;
            '@roots/merged-manifest-webpack-plugin': Module;
        }
    }
}
//# sourceMappingURL=interface.d.ts.map