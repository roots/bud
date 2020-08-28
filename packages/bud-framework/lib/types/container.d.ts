import { Loose } from '@roots/bud-typings';
export declare type Repository = {
    [key: string]: any | any[];
};
export declare type RepositoryDefinition = {
    name: string;
    register: Repository;
};
export declare type Key = string;
export declare type MaybeCallable = any | ((any: any) => any) | any[];
export declare type Getter = (this: Container, key?: Key) => MaybeCallable;
export declare type Action = (this: Container, ...args: any) => void;
export declare type ConditionalCheck = (this: Container, key: Key, value?: any) => boolean;
export declare interface ContainerInterface extends Loose {
    name: string;
    repository: Repository;
    new: Action;
    get: Getter;
    require: () => void;
    addTo: Action;
    has: ConditionalCheck;
    is: ConditionalCheck;
    set: Action;
    map: Action;
    entries: Getter;
    push: Action;
    merge: Action;
    delete: Action;
    enable: Action;
    enabled: ConditionalCheck;
    disable: Action;
    disabled: ConditionalCheck;
}
export declare interface FileContainerInterface extends ContainerInterface {
    require: Getter;
    exists: ConditionalCheck;
}
export declare interface PluginContainerInterface extends ContainerInterface {
    add: Action;
}
export declare type Container = ContainerInterface;
export declare type FileContainer = FileContainerInterface;
export declare type PluginContainer = PluginContainerInterface;
export declare type ContainerBind = (repository: Repository) => Container | FileContainer | PluginContainer;
declare const container: Action;
/**
 * Bind container.
 */
declare const registerContainer: ContainerBind;
/**
 * Bind file container.
 */
declare const registerFileContainer: ContainerBind;
/**
 * Bind extension container.
 */
declare const registerPluginContainer: ContainerBind;
export { container, registerContainer, registerFileContainer, registerPluginContainer, };
//# sourceMappingURL=container.d.ts.map