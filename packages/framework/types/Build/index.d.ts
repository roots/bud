import webpack, { Configuration } from 'webpack';
import { Rule } from '../Rule';
export { Build };
declare class Build implements Build {
    bud: Framework.Bud;
    builders: Partial<Framework.Build.Builders>;
    loaders: Framework.Index<Framework.Build.Loader>;
    items: Framework.Index<Framework.Item>;
    rules: Framework.Index<Framework.Rule>;
    config: Framework.Container;
    constructor(bud: Framework.Bud);
    compile(): Configuration;
    getLoader(name: string): Framework.Build.Loader;
    setLoader(name: string, loader: Framework.Build.Loader): Framework.Build.Loader;
    getItem(name: string): Framework.Item.Product;
    setItem(name: string, module: Framework.Item.Module): Framework.Item;
    mergeItem(item: string, value: Partial<Framework.Item>): void;
    getRule(name: string): webpack.RuleSetRule;
    setRule(name: string, module: Framework.Rule.Module): Rule;
    mergeRule(rule: string, value: Partial<Framework.Rule>): void;
}
//# sourceMappingURL=index.d.ts.map