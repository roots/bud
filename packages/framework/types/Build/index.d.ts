import { Configuration } from 'webpack';
import { Item } from './Item';
import { Rule } from './Rule';
import Container from '@roots/container';
export declare class Build {
    bud: Framework.Bud;
    builders: Partial<Build.Builders>;
    loaders: Framework.Index<Build.Loader>;
    items: Framework.Index<Item>;
    rules: Framework.Index<Rule>;
    config: Container;
    constructor(bud: Framework.Bud);
    compile(this: Framework.Bud): Configuration;
    makeLoader(name: string, loader: Build.Loader): Build.Loader;
    makeItem(name: string, module: Build.Item.Module): Item;
    makeRule(name: string, module: Build.Rule.Module): Rule;
}
//# sourceMappingURL=index.d.ts.map