import { Loose } from '@roots/bud-typings';
import { Bud } from './';
declare type Repository = {
    [key: string]: any | any[];
} | any | any[];
declare type RepositoryDefinition = {
    name: string;
    register?: Repository;
    boot?: (bud: Bud) => Repository;
};
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
    add: Action;
}
declare type Container = ContainerInterface;
declare type FileContainer = FileContainerInterface;
declare type ContainerBind = (repository: Repository) => Container | FileContainer | ExtensionContainer;
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
declare const registerExtensionContainer: ContainerBind;
export { container, registerContainer, registerFileContainer, registerExtensionContainer, };
export type { Container, FileContainer, ExtensionContainer, Repository, RepositoryDefinition, };
//# sourceMappingURL=container.d.ts.map