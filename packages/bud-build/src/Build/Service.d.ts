/// <reference types="webpack" />
import { Service } from '@roots/bud-support';
import type { Webpack, Framework } from '@roots/bud-typings';
export default abstract class extends Service<Framework> {
    builders: Partial<Framework.Build.Builder>;
    loaders: any;
    items: any;
    rules: any;
    abstract make(): Webpack.Configuration;
    abstract setLoader(name: string, loader: Framework.Loader): Framework.Loader;
    abstract getLoader(name: string): Framework.Loader;
    abstract getItem(name: string): Framework.Item;
    abstract setItem(name: string, module: Framework.Item.Module): Framework.Item;
    abstract getRule(name: string): Framework.Rule;
    abstract setRule(name: string, module: Framework.Rule.Module): Framework.Rule;
}
//# sourceMappingURL=Service.d.ts.map