import webpack, { Configuration } from 'webpack';
import { Item } from './Item';
import { Rule } from './Rule';
import Container from '@roots/container';
export declare class Build implements Framework.Build {
    bud: Framework.Bud;
    builders: Partial<Build.Builders>;
    loaders: Framework.Index<Build.Loader>;
    items: Framework.Index<Item>;
    rules: Framework.Index<Rule>;
    config: Container;
    constructor(bud: Framework.Bud);
    compile(): Configuration;
    getLoader(name: string): Build.Loader;
    setLoader(name: string, loader: Build.Loader): Build.Loader;
    getItem(name: string): Build.Item.Product;
    setItem(name: string, module: Build.Item.Module): Item;
    mergeItem(item: string, value: Partial<Build.Item>): void;
    getRule(name: string): webpack.RuleSetRule;
    setRule(name: string, module: Build.Rule.Module): Rule;
    mergeRule(rule: string, value: Partial<Build.Rule>): void;
}
//# sourceMappingURL=index.d.ts.map