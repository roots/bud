import type { ReactRefreshPluginOptions } from '@pmmmwh/react-refresh-webpack-plugin/types/lib/types';
import type { Framework } from '@roots/bud-framework';
/**
 * Configure react-refresh-webpack-plugin options
 */
interface reactRefresh {
    (this: Framework, options: ReactRefreshPluginOptions): Framework;
}
declare const reactRefresh: reactRefresh;
export { reactRefresh };
//# sourceMappingURL=reactRefresh.d.ts.map