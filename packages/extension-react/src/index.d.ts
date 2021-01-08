import type { Framework, Module } from '@roots/bud-typings';
import { ReactRefreshPluginOptions } from '@pmmmwh/react-refresh-webpack-plugin/types/types';
export declare const setLoaders: Framework.Module['setLoaders'];
export declare const setItems: Framework.Module['setItems'];
/**
 * @roots/bud-react extension
 */
export declare const boot: Module.Boot;
declare module '@roots/bud-typings' {
    namespace Framework {
        namespace Api {
            type ReactRefresh = (this: Framework, options: ReactRefreshPluginOptions) => Framework;
        }
    }
}
//# sourceMappingURL=index.d.ts.map