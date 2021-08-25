import * as RefreshPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import { ReactRefreshPluginOptions } from '@pmmmwh/react-refresh-webpack-plugin/types/lib/types';
import type { Module } from '@roots/bud-framework';
/**
 * Adds react-refresh-webpack-plugin to @roots/bud projects
 */
interface BudReactRefreshPlugin extends Module<RefreshPlugin, ReactRefreshPluginOptions> {
}
declare const BudReactRefreshPlugin: BudReactRefreshPlugin;
export { BudReactRefreshPlugin };
//# sourceMappingURL=BudReactRefreshPlugin.d.ts.map