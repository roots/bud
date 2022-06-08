import { Extension } from '@roots/bud-framework/extension';
import AutoDllPlugin from 'autodll-webpack-plugin';
declare type Plugin = Partial<Extension<AutoDllPlugin.Options, AutoDllPlugin>>;
interface factory {
    (modules: string | string[]): Plugin;
}
declare const factory: factory;
export { Plugin, factory };
//# sourceMappingURL=factory.d.ts.map