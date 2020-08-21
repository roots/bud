import { Loose } from '@roots/bud-typings';
declare type Repository = any[] | any;
declare type Key = string;
declare type Getter = (this: Container, key?: Key) => any;
declare type Action = (this: Container, ...args: any) => void;
declare type ConditionalCheck = (this: Container, key: Key, value?: any) => boolean;
interface ContainerInterface extends Loose {
    name: string;
    repository: Repository;
    new: Action;
    get: Getter;
    require: () => void;
    has: ConditionalCheck;
    is: ConditionalCheck;
    set: Action;
    map: Action;
    entries: Getter;
    merge: Action;
    delete: Action;
    enable: Action;
    enabled: ConditionalCheck;
    disable: Action;
    disabled: ConditionalCheck;
}
interface FileContainerInterface extends ContainerInterface {
    require: Getter;
    exists: ConditionalCheck;
}
interface ExtensionContainer extends ContainerInterface {
    controller: (this: Container, args: any[]) => any;
    add: Action;
}
declare type Container = ContainerInterface;
declare type FileContainer = FileContainerInterface;
declare type ContainerBind = (repository: Repository, name: string) => Container | FileContainer | ExtensionContainer;
declare const container: Action;
/**
 * Bind container.
 */
declare const bindContainer: ContainerBind;
/**
 * Bind file container.
 */
declare const bindFileContainer: ContainerBind;
/**
 * Bind extension container.
 */
declare const bindExtensionContainer: ContainerBind;
export { container, bindContainer, bindFileContainer, bindExtensionContainer };
export type { Container, FileContainer, ExtensionContainer, Repository };
//# sourceMappingURL=index.d.ts.map