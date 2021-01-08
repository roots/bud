import { Framework, Module, Item, Loader, Rule } from '@roots/bud-typings';
import { LoaderOptions } from 'ts-loader/dist/interfaces';
export declare const options: (instance: Framework) => Partial<LoaderOptions> | LoaderOptions;
export declare const setLoaders: Module.Register<Loader>;
export declare const setItems: Module.Register<Item>;
export declare const setRules: Module.Register<Rule.Module>;
export declare const api: {
    typescript: (this: Framework, options: Partial<LoaderOptions> | LoaderOptions) => Framework;
};
export declare const boot: (app: Framework) => void;
//# sourceMappingURL=index.d.ts.map