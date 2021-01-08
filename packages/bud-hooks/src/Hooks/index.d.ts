import Service from './Service';
import { Hooks as Contract } from '@roots/bud-typings';
/**
 * Hooks
 */
export declare class Hooks extends Service implements Contract {
    on<T = unknown>(name: string, filter: Contract.Filter.Fn<T>): void;
    when<T = unknown>(name: string, action: Contract.Action.Fn<T>): void;
    action<T = unknown>(name: string, binding: T): void;
    filter<T = unknown>(name: string, value: T): T;
}
//# sourceMappingURL=index.d.ts.map