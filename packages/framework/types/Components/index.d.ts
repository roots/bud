import { Loader } from 'webpack';
import Bud from '../Bud';
import Item from './Item';
import Rule from './Rule';
import items from './items';
import rules from './rules';
import loaders from './loaders';
declare const makeComponents: (bud: Bud) => {
    items: Framework.Index<Item>;
    rules: Framework.Index<Rule>;
    loaders: Framework.Index<Loader>;
};
export { makeComponents as default };
//# sourceMappingURL=index.d.ts.map