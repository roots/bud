import { Framework } from './';
/**
 * String keyed value.
 */
export declare type Index<T> = {
    [key: string]: T;
};
/**
 * Constructable function/class yielding T type
 */
export interface Constructor<T> {
    new (params?: unknown): T;
}
/**
 * Chainable
 */
export interface Fluent<T> {
    function(this: T): T;
}
export declare type Use = (this: Framework, extensions: Framework.Module[keyof Framework.Module]) => Framework;
export declare namespace Use {
    type Tuple = [string, Framework.Module] | [string, Factory<Framework, Framework.Module>];
}
export declare type When = (this: Framework, test: boolean, isTrue: (bud: Framework) => unknown, isFalse?: (bud: Framework) => unknown) => Framework;
export declare type Factory<ReturnType = unknown, Args = unknown> = (args?: Args) => ReturnType;
export declare type OneOrMany<T> = T | T[];
/**
 * Might be a function that produces a value, might be
 * the value itself.
 */
export declare type MaybeCallable<T = unknown, A = unknown> = Factory<T, A> | T;
export declare namespace MappedType {
    type One<T> = {
        [K in keyof T]: T[K];
    };
    type OneOrMany<T> = {
        [K in keyof T]: T[K] | T[K][];
    };
    type Many<T> = {
        [K in keyof T]: T[K][];
    };
    type Callable<T, A> = {
        [K in keyof T]: (args: A) => T[K];
    };
    type MaybeCallable<T, A> = {
        [K in keyof T]: Callable<T, A>[K] | T[K];
    };
}
//# sourceMappingURL=utility.d.ts.map