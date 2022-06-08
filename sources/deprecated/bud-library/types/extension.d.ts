import { Extension } from '@roots/bud-framework/extension';
import AutoDllPlugin from 'autodll-webpack-plugin';
export default class BudDllExtension extends Extension<AutoDllPlugin.Options, AutoDllPlugin> {
    add(modules: string | Array<string>): Promise<import("@roots/bud-framework").Bud>;
}
//# sourceMappingURL=extension.d.ts.map