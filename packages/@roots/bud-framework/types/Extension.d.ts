import { Framework } from './Framework';
import { Hooks } from './Hooks';
import { Module } from './Module';
declare type Key = `${keyof Framework.Extensions & string}`;
declare abstract class Extension {
    protected _module: Module;
    protected _app: () => Framework;
    abstract register(): Extension;
    abstract boot(): Extension;
    constructor(app: Framework, extension: Module);
    get module(): Module;
    get app(): Framework;
    get name(): keyof Framework.Extensions;
    get options(): Module['options'];
    set options(options: Module['options']);
    get when(): Module.When;
    set when(when: Module.When);
    /**
     * @property {Module.Make} make
     */
    get make(): Module.Make;
    get apply(): any;
    set make(make: Module.Make);
    makeKey(key: Key): Hooks.Name;
    get(key: Key): any;
    set(key: Key, value: any): void;
}
export { Extension };
//# sourceMappingURL=Extension.d.ts.map