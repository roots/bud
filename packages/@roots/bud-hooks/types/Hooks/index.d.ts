import { Framework, Hooks as Contract, Service } from '@roots/bud-framework';
declare class Hooks extends Service implements Contract {
    name: string;
    get<T = any>(path: `${Contract.Name & string}`): T;
    set(key: `${Contract.Name & string}`, value: any): this;
    on(id: Contract.Name, callback: Contract.Hook): Framework;
    filter<T = any>(id: `${Contract.Name & string}`, value?: any): T;
}
export { Hooks };
//# sourceMappingURL=index.d.ts.map